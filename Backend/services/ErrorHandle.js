const config = require('./../configuration/config');

const log = async (text) => {
    try {
        if(config.environment.status !== 'dev') {
            // Connect to 3d party service for logging
        }
        console.log(`[${new Date().toLocaleString()}][LOG] - ${text}`)
    } catch(e) {
        console.log(e);
    }
}

const error = async (text) => {
    try {
        if(config.environment.status !== 'dev') {
            // Connect to 3d party service for logging
        }
        console.log(`[${new Date().toLocaleString()}][ERROR] - ${text}`)
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    log,
    error
}