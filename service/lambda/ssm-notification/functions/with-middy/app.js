const appLayerLib = require('app')
const mysqlLayerLib = require('mysql')

let response;

const handler = async (event, context) => {
    try {
        console.log(JSON.stringify(process.env));
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: JSON.stringify({
                    appLayerLibs: Object.keys(appLayerLib),
                    mysqlLayerLibs: Object.keys(mysqlLayerLib),
                    APM_API_KEY: process.env.APM_API_KEY,
                    DB_HOST: process.env.DB_HOST
                }),
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

exports.lambdaHandler = handler;
