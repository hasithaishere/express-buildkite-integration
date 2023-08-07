const {
	SSMClient,
	GetParameterCommand,
	GetParametersByPathCommand
} = require('@aws-sdk/client-ssm');
const { promises: fs } = require('fs');
const yaml = require('js-yaml');
const get = require('lodash.get');

class Config {
	constructor() {
		this.SSMClients = {};
	}

	getSSMClient(region) {
		let client = this.SSMClients[region];
		if (client !== undefined) return client;

		client = new SSMClient({ region });
		this.SSMClients[region] = client;

		return client;
	}

	async getParameter(options) {
		const { region, parameterName } = options;
		try {
			const client = this.getSSMClient(region);
			const command = new GetParameterCommand({
				Name: parameterName,
				WithDecryption: true
			});
			const {
				Parameter: { Value: parameterValue }
			} = await client.send(command);
			return parameterValue.replace(/[\r\n]+/gm, '');
		} catch (error) {
			if (error.name === 'ParameterNotFound') {
				return null;
			} else {
				throw error;
			}
		}
	}

	async getParametersByPath(parameterPath, region, nextToken, parameters = []) {
		const client = this.getSSMClient(region)

		const params = {
			Path: parameterPath,
			Recursive: true,
			MaxResults: 10,
			NextToken: nextToken,
			WithDecryption: true
		};

		const response = await client.send(new GetParametersByPathCommand(params));

		// Concatenate the newly retrieved parameters with the previous ones.
		const allParameters = parameters.concat(response.Parameters || []);

		if (response.NextToken) {
			// Make a recursive call if there are more parameters to retrieve.
			return this.getParametersByPath(parameterPath, region, response.NextToken, allParameters);
		}

		return allParameters;
	}

	async loadEnvs(options = {}) {
		try {
			const envCache = process.env.ENV_CACHE || false;
			if (envCache) return JSON.parse(envCache);

			const { region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION } = options;

			const config = yaml.load(await fs.readFile(`${process.cwd()}/config.yaml`, 'utf8'));

			const baseSSMPath = get(config, 'env_vars.base_key_path', []);

			const secretKeys = await this.getParametersByPath(baseSSMPath, region);

			const allowedSecretsKeys = new Set(get(config, 'env_vars.secrets', []));

			const envVars = {};

			for (const secretKey of secretKeys) {
				const key = secretKey.Name.replace(baseSSMPath, '').replace('/', '');

				if (allowedSecretsKeys.has(key)) {
					envVars[key] = secretKey.Value;
					process.env[key] = secretKey.Value;
				}
			}

			// Check if all the secrets are loaded and identify the missing variables
			const notLoadedEnvVars = [...allowedSecretsKeys].filter((element) => !new Set(Object.keys(envVars)).has(element));

			if (notLoadedEnvVars.length > 0) {
				console.log(`These Env. variables/ secrets not loaded: ${notLoadedEnvVars.join(', ')}`);
			}

			process.env.ENV_CACHE = JSON.stringify(envVars);

			return envVars;
		} catch (error) {
			console.error('Unable to load environment variables from Parameter Store');
			return {};
		}
	}
}

module.exports = Config;
