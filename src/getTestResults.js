const axios = require('axios');

const getTestResults = async (userInfo) => {
    const URL = `https://healthenl.ca/concerto/GetCovid19Results.htm?identifier=${userInfo.MCP}&assigningauthority=2.16.840.1.113883.4.52&dob=${userInfo.DOB}&firstname=${userInfo.FirstName}&lastname=${userInfo.LastName}&exp=${userInfo.EXP}`;
    return axios.get(URL);
};

module.exports = getTestResults;
