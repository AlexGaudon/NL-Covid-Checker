const fs = require('fs');
const nodeCron = require('node-cron');
const path = require('path');
const getTestResults = require('./getTestResults');

let config = {};

const log = (msg) => {
    console.log(`${new Date().toLocaleString()} ${msg}`);
};

// Load config file from the default location.
try {
    config = require('../config.json');
    console.log(`Configuration file loaded:\n ${JSON.stringify(config)}`);
} catch (exception) {
    if (exception.code == 'MODULE_NOT_FOUND') {
        console.error(
            'Configuration file not found. Please create a configuration file and save it in the root directory as "config.json"'
        );
        process.exit(1);
    }
}

async function main() {
    const testResults = await getTestResults(config);
    if (testResults?.data?.ObservationCount > (config.TestCount || 0)) {
        config.TestCount = testResults.data.ObservationCount;
        await fs.promises.writeFile(
            './config.json',
            JSON.stringify(config, null, 2)
        );
        for (let i = 1; i <= testResults.data.ObservationCount; i++) {
            log(
                `Test Result: ${JSON.stringify(
                    testResults.data[`Observation${i}`]
                )}`
            );
        }
    } else {
        log('No new results posted.');
    }
}

main();

nodeCron.schedule(config.CronSchedule || '*/5 * * * *', async () => {
    await main();
});
