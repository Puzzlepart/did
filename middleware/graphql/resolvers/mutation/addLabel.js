const log = require('debug')('middleware/graphql/resolvers/mutation/addLabel');

/**
 * Add label
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function addLabel(_obj, args, context) {
    log('Adding label: %s', JSON.stringify(args.label));
    try {
        await context.services.storage.addLabel(args.label);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

module.exports = addLabel;