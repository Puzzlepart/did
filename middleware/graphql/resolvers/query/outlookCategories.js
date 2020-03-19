const log = require('debug')('middleware/graphql/resolvers/query/outlookCategories');

/**
 * Get Outlook categories
 * 
 * @param {*} _obj Unused object
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function outlookCategories(_obj, _args, context) {
    let categories = await context.services.graph.getOutlookCategories();
    return categories.map(c => ({ ...c, key: c.id }));
}

module.exports = outlookCategories;