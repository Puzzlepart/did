const { isBlank } = require('underscore.string')
const log = require('debug')('env')

/**
 * Get environment variable by key with optional fallbackvalue
 * 
 * @param {*} key Key
 * @param {*} fallbackValue Fallback vaue if key is not found
 */
const getEnvironmentVariable = (key, fallbackValue) => {
    const value = process.env[key]
    if (isBlank(value)) {
        log('Missing environment variable %s', key)
        return fallbackValue || null
    }
    return value
}

module.exports = getEnvironmentVariable