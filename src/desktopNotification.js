const notifier = require('node-notifier');

const sendNotification = async (message) => {
    notifier.notify({
        title: 'Covid Test Results',
        message: message,
        wait: true,
    });
};

module.exports = sendNotification;
