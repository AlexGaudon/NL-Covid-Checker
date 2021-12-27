const fs = require('fs');
const cron = require('node-cron');
const path = require('path');
const covidChecker = require('./covidChecker');
const { log } = require('./utils');

const checkers = [];

const files = fs.readdirSync('./configs/');
console.log(files);

files.forEach((file) => {
    checkers.push(new covidChecker(path.join(__dirname, '../configs', file)));
});

if (checkers.length > 0) {
    cron.schedule('*/1 * * * *', () => {
        checkers.forEach((chk, i) => {
            setTimeout(() => {
                chk.run();
            }, i * (60 * 1000));
            log(`Running ${chk.config.FirstName} in ${i} minutes.`);
        });
    });
}
