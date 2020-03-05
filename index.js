const http = require('http');
const makeRequest = require('./utilities/http-utilities').makeRequest;
const CacheUtilities = require('./utilities/caching-utilities');
const URL = require('./config/config').URL;
const parseService = require('./services/parse-service');

http.createServer(async function (req, res) {
    if (req.method === 'GET' && /^[\/]menu$/.test(req.url)) {
        const cacheUtilities = new CacheUtilities();
        const key = req.url;
        const data = cacheUtilities.getFromcache(key);

        if (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        }
        else {
            const data = await makeRequest(URL, 'GET', null, null);
            const modified_data = parseService.parseData(data);
            cacheUtilities.setToCache(key, modified_data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(modified_data));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('PAGE NOT FOUND');
    }
}).listen(process.env.PORT || 1337);