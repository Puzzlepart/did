import { createTableService, TableQuery, TableService } from 'azure-storage';
const azureTableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING);
const moment = require('moment');

export interface IParseEntitiesOptions {
    idUpper?: boolean;
    dateFormat?: string;
}

/**
 * Parse an array of azure table storage entities
 * 
 * Makes the keys camelCase and adds RowKey as 'id' and 'key
 * 
 * Also skips PartitionKey
 * 
 * @param {any} arr The array of entities to parse
 * @param {*} mapFunc Mapping function (optional)
 * @param {*} options Options (optional)
 */
export function parseEntities(arr: any[], mapFunc?: (res: any) => any, options: IParseEntitiesOptions = {}) {
    let result: any[] = arr.map(item => Object.keys(item)
        .filter(key => key !== 'PartitionKey')
        .reduce((obj, key) => {
            const transformedKey = key.charAt(0).toLowerCase() + key.slice(1);
            const value = item[key]._;
            if (key === 'RowKey') {
                obj.id = options.idUpper ? value.toUpperCase() : value;
                obj.key = obj.id;
                return obj;
            }
            switch (item[key].$) {
                case 'Edm.DateTime': {
                    let dateValue = value.toISOString();
                    if (options.dateFormat) {
                        dateValue = moment(dateValue).format(options.dateFormat);
                    }
                    obj[transformedKey] = dateValue;
                }
                    break;
                default: {
                    obj[transformedKey] = value;
                }
            }
            return obj;
        }, {} as any));
    if (mapFunc) result = result.map(mapFunc);
    return result;
}

/**
 * Function that simplifes creating a new TableQuery from azure-storage
 * 
 * @param {number} top 
 * @param {string[]} select 
 * @param {string} filter 
 */
export function createQuery(top?: number, select?: string[], filter?: string) {
    let query = new TableQuery().top(top);
    if (top) query = query.top(top);
    if (select) query = query.select(select);
    if (filter) query = query.where(filter);
    return query;
}

/**
 * Queries a table using the specified query
 * 
 * @param {string} tableName 
 * @param {TableQuery} query 
 * @param {TableService.TableContinuationToken} continuationToken 
 */
export function queryTable(tableName: string, query: TableQuery, continuationToken?: TableService.TableContinuationToken): Promise<TableService.QueryEntitiesResult<any>> {
    return new Promise((resolve, reject) => {
        azureTableService.queryEntities(tableName, query, continuationToken, (error, result) => {
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
export async function queryTableAll(table: any, query: any) {
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
export function retrieveEntity(table: any, partitionKey: any, rowKey: any) {
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
export function addEntity(table: any, item: any) {
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
 */
export function updateEntity(table: any, item: any) {
    return new Promise((resolve, reject) => {
        azureTableService.insertOrReplaceEntity(table, item, undefined, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    });
};

/**
 * Delete entity
 * 
 * @param {*} item 
 */
export function deleteEntity(table, item: any) {
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
export function executeBatch(table: any, batch: any) {
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