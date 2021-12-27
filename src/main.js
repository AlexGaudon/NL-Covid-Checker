const fs = require('fs');
const cron = require('node-cron');
const path = require('path');
const covidChecker = require('./covidChecker');
const { log } = require('./utils');

const checkers = [];

const files = fs.readdirSync('./configs/');

files.forEach((file) => {
    if (file.endsWith('json')) {
        checkers.push(
            new covidChecker(path.join(__dirname, '../configs', file))
        );
    }
});

if (checkers.length > 0) {
    cron.schedule('*/10 * * * *', () => {
        checkers.forEach((chk, i) => {
            setTimeout(() => {
                chk.run();
            }, i * (60 * 1000));
            log(`Running ${chk.config.FirstName} in ${i} minutes.`);
        });
    });
}
