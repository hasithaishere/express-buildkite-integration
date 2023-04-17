const appLayerLib = require('app')
const mysqlLayerLib = require('mysql')
const { promisify } = require('util');
const sleep = promisify(setTimeout);
// const url = 'http://checkip.amazonaws.com/';
let response;

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const lambdaHandler = async (event, context) => {
    // const ret = await axios(url);
    const randNo = randomInteger(10, 9795);
    if (randNo < 1995) {
        throw new Error(`New Error Less 1995: ${randNo}`);
    } else if (randNo <  3995) {
        throw new Error(`New Error Less 3995: ${randNo}`);
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

exports.lambdaHandler = appLayerLib.Sentry.AWSLambda.wrapHandler(lambdaHandler);
