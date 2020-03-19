const log = require('debug')('middleware/graphql/resolvers/mutation/createOutlookCategory');
const _ = require('underscore');

/**
 * Create Outlook category
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function createOutlookCategory(_obj, args, context) {
    log('Creating oulook category: %s', JSON.stringify(args.category));
    try {
        const category = await context.services.graph.createOutlookCategory(args.category);
        return { data: JSON.stringify(category), success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = createOutlookCategory;