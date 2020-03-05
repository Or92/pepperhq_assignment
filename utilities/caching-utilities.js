const mcache = require('memory-cache');
const CONFIG = require('../config/config');

class CacheUtilities {
    getFromcache(key) {
        return mcache.get(key);
    }

    setToCache(key, data) {
        mcache.put(key, data, CONFIG.TIME_TO_LIVE);
    }
}

module.exports = CacheUtilities;