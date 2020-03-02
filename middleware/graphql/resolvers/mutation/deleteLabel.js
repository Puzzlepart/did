const log = require('debug')('middleware/graphql/resolvers/mutation/addLabel');

/**
 * Delete label
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function deleteLabel(_obj, args, context) {
    log('Removing label: %s', JSON.stringify(args.id));
    try {
        await context.services.storage.deleteLabel(args.id);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

module.exports = deleteLabel;