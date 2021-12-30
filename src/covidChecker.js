const getTestResults = require('./getTestResults');
const fs = require('fs');
const path = require('path');
const { log } = require('./utils');
const emailNotification = require('./emailNotification');
const discordNotification = require('./discordNotification');
const desktopNotification = require('./desktopNotification');

class covidChecker {
    constructor(configPath) {
        log(configPath);
        this.configPath = configPath;
        try {
            this.config = require(this.configPath);
        } catch (exception) {
            log(`Error including: ${this.configPath}`);
            process.exit(1);
        }
    }

    async handleNewResult(result) {
        log(`new log for ${this.configPath}`);
        const msg = `${this.config.FirstName}: Your test result from ${
            result.split('|')[0]
        } came back as ${result.split('|')[1]}`;
        if (this.config.WebHookURL) {
            await discordNotification(this.config.FirstName, msg);
        }
        if (this.config.desktopNotification) {
            await desktopNotification(msg);
        }
        if (this.config.email) {
            emailNotification(this.config.email, msg);
        }
    }

    async run() {
        log(`run::${this.configPath}`);
        const testResults = await getTestResults(this.config);
        if (
            testResults?.data?.ObservationCount > (this.config.TestCount || 0)
        ) {
            this.config.TestCount = testResults.data.ObservationCount;
            await fs.promises.writeFile(
                this.configPath,
                JSON.stringify(this.config, null, 2)
            );
            for (
                let i = this.config.TestCount;
                i <= testResults.data.ObservationCount;
                i++
            ) {
                await this.handleNewResult(testResults.data[`Observation${i}`]);
            }
        }
    }
}

module.exports = covidChecker;
