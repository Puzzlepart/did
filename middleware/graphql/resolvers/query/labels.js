const log = require('debug')('middleware/graphql/resolvers/query/labels');

/**
 * Labels
 * 
 * @param {*} _obj Unused object
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function labels(_obj, _args, context) {
    let labels = await context.services.storage.getLabels();
    log('Retrieved %s labels from storage', labels.length);
    return labels;
}

module.exports = labels;