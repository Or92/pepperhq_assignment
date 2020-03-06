const request = require('request');

function makeRequest(url, method, headers, body) {
    return new Promise((res, rej) => {
        const options = {
            url,
            method,
            headers,
            body
        };

        request(options, (err, response, body) => {
            if (err) {
                return rej(err);
            }
            return res(JSON.parse(body));
        });
    });

}

module.exports = {
    makeRequest
};

