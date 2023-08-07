const appLayerLib = require('app')
const mysqlLayerLib = require('mysql')

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: JSON.stringify({
                    appLayerLibs: Object.keys(appLayerLib),
                    mysqlLayerLibs: Object.keys(mysqlLayerLib)
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
