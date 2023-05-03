const appLayerLib = require('app')
const mysqlLayerLib = require('mysql')
const { promisify } = require('util');
const sleep = promisify(setTimeout);
let response;

// Add function comment. Update Function.
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This is enhancement
const lambdaHandler = async (event, context) => {
    // const ret = await axios(url);
    const randNo = randomInteger(10, 8700);
    if (randNo < 2745) {
        //throw new Error(`New Error Less 2745: ${randNo}`);
        appLayerLib.APM.captureError(new Error(`New Error Less 2745: ${randNo}`));
    } else if (randNo <  4745) {
        //throw new Error(`New Error Less 4745: ${randNo}`);
        appLayerLib.APM.captureError(new Error(`New Error Less 4745: ${randNo}`));
    } else {
        await sleep(randNo);
    }

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: JSON.stringify({
                appLayerLibs: Object.keys(appLayerLib),
                mysqlLayerLibs: Object.keys(mysqlLayerLib)
            }),
            timestamp: Date.now(),
            waitTime: `${randNo}ms`
            // location: ret.data.trim()
        })
    }

    //return response
};

let handler = lambdaHandler;

if (process.env.SENTRY_DSN !== undefined) {
    handler = appLayerLib.Sentry.AWSLambda.wrapHandler(lambdaHandler);
}

exports.lambdaHandler = handler;
