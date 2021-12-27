const axios = require('axios');

const postMessage = async (firstname, message) => {
    const request = {
        content: message,
        username: `${firstname} COVID Results`,
    };

    return axios.post(config.WebHookURL, request);
};

module.exports = postMessage;
