const axios = require('axios');
const config = require('../config.json');

const postMessage = async (message) => {
    const request = {
        content: message,
        username: `${config.FirstName} COVID Results`,
    };

    return axios.post(config.WebHookURL, request);
};

module.exports = postMessage;
