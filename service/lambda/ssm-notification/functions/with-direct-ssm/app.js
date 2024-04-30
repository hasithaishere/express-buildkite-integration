const appLayerLib = require('app')
const mysqlLayerLib = require('mysql')
// Test Comment
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log(JSON.stringify(process.env, null, 2));
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
