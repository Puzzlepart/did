const { createTableService, TableQuery, TableUtilities } = require('azure-storage');
const azureTableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING);

/**
 * Parse an array of Azure table storage entities
 * 
 * Adds {RowKey} as 'id' and 'key, skips {PartitionKey}
 * 
 * @param {*} arr The array of entities to parse
 * @param {*} mapFunc Mapping function (optional)
 * @param {*} options Options (optional)
 */
function parseEntities(arr, mapFunc, options) {
    options = options || {};
    let result = arr.map(item => Object.keys(item)
        .filter(key => key !== 'PartitionKey')
        .reduce((obj, key) => {
            const newKey = key.charAt(0).toLowerCase() + key.slice(1);
            const value = item[key]._;
            if (key === 'RowKey') {
                obj.id = options.idUpper ? value.toUpperCase() : value;
                obj.key = obj.id;
                return obj;
            }
            switch (item[key].$) {
                case 'Edm.DateTime': {
                    let dateValue = value.toISOString();
                    obj[newKey] = dateValue;
                }
                    break;
                default: {
                    obj[newKey] = value;
                }
            }
            return obj;
        }, {}));
    if (mapFunc) result = result.map(mapFunc);
    return result;
}

/**
 * Function that simplifes creating a new TableQuery from azure-storage
 * 
 * @param {*} top 
 * @param {*} select 
 * @param {*} filter 
 */
function createQuery(top, select, filter) {
    let query = new TableQuery().top(top);
    if (top) query = query.top(top);
    if (select) query = query.select(select);
    if (filter) query = query.where(filter);
    return query;
}

/**
 * Queries a table using the specified query
 * 
 * @param {*} table 
 * @param {*} query 
 * @param {*} continuationToken 
 */
function queryTable(table, query, continuationToken) {
    return new Promise((resolve, reject) => {
        azureTableService.queryEntities(
            table,
            query,
            continuationToken,
            (error, result) => {
                if (!error) return resolve(result);
                else reject(error);
            });
    });
};

/**
 * Queries all entries in a table using the specified query
 * 
 * @param {*} table 
 * @param {*} query 
 */
async function queryTableAll(table, query) {
    let token = null;
    let { entries, continuationToken } = await queryTable(table, query, token);
    token = continuationToken;
    while (token != null) {
        let result = await queryTable(table, query, token);
        entries.push(...result.entries);
        token = result.continuationToken;
    }
    return entries;
};

/**
 * Retrieves an entity
 * 
 * @param {*} table 
 * @param {*} partitionKey 
 * @param {*} rowKey 
 */
function retrieveEntity(table, partitionKey, rowKey) {
    return new Promise((resolve, reject) => {
        azureTableService.retrieveEntity(table, partitionKey, rowKey, (error, result) => {
            if (!error) {
                return resolve(result);
            } else {
                reject(error);
            }
        })
    });
};

/**
 * Adds an entity
 * 
 * @param {*} table 
 * @param {*} item 
 */
function addEntity(table, item) {
    return new Promise((resolve, reject) => {
        azureTableService.insertEntity(table, item, (error, result) => {
            if (!error) {
                return resolve(result['.metadata']);
            } else {
                reject(error);
            }
        })
    });
};

/**
 * Updates the entity
 * 
 * @param {*} table 
 * @param {*} item 
 * @param {*} merge 
 */
function updateEntity(table, item, merge) {
    return new Promise((resolve, reject) => {
        if (merge) {
            azureTableService.insertOrMergeEntity(table, item, undefined, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        } else {
            azureTableService.insertOrReplaceEntity(table, item, undefined, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        }
    });
};

/**
 * Delete entity
 * 
 * @param {*} item 
 */
function deleteEntity(table, item) {
    return new Promise((resolve, reject) => {
        azureTableService.deleteEntity(table, item, undefined, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    });
};


/**
 * Executes a batch operation
 * 
 * @param {*} table 
 * @param {*} batch 
 */
function executeBatch(table, batch) {
    return new Promise((resolve, reject) => {
        azureTableService.executeBatch(table, batch, (error, result) => {
            if (!error) {
                return resolve(result);
            } else {
                reject(error);
            }
        })
    });
};

module.exports = {
    createQuery,
    queryTable,
    queryTableAll,
    addEntity,
    retrieveEntity,
    updateEntity,
    deleteEntity,
    executeBatch,
    parseEntities,
    entGen: TableUtilities.entityGenerator,
}