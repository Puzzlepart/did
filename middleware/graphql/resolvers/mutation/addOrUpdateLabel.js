const log = require('debug')('middleware/graphql/resolvers/mutation/addOrUpdateLabel');

/**
 * Add label
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function addOrUpdateLabel(_obj, args, context) {
    log('Adding or updating label: %s', JSON.stringify(args.label));
    try {
        await context.services.storage.addOrUpdateLabel(args.label);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

module.exports = addOrUpdateLabel;