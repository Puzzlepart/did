const log = require('debug')('middleware/graphql/resolvers/mutation/createOutlookCategory');
const _ = require('underscore');

/**
 * Create Outlook category
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function createOutlookCategory(_obj, variables, context) {
    log('Creating oulook category: %s', JSON.stringify(variables.category));
    try {
        const category = await context.services.graph.createOutlookCategory(variables.category);
        return { data: JSON.stringify(category), success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = createOutlookCategory;