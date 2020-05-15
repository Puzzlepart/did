const { TableQuery, TableUtilities, TableBatch } = require('azure-storage')

class TableUtil {
    /**
     * Parse an array of Azure table storage entities
     * 
     * Adds {RowKey} as 'id' and 'key, skips {PartitionKey}
     * 
     * @param {*} arr The array of entities to parse
     * @param {*} mapFunc Mapping function (optional)
     * @param {*} options Options (optional)
     */
    parseEntities(arr, mapFunc, options) {
        options = options || {}
        let result = arr.map(item => Object.keys(item)
            .filter(key => key !== 'PartitionKey')
            .reduce((obj, key) => {
                const newKey = key.charAt(0).toLowerCase() + key.slice(1)
                const value = item[key]._
                if (key === 'RowKey') {
                    obj.id = options.idUpper ? value.toUpperCase() : value
                    obj.key = obj.id
                    return obj
                }
                switch (item[key].$) {
                    case 'Edm.DateTime': {
                        let dateValue = value.toISOString()
                        obj[newKey] = dateValue
                    }
                        break
                    default: {
                        obj[newKey] = value
                    }
                }
                return obj
            }, {}))
        if (mapFunc) result = result.map(mapFunc)
        return result
    }

    entGen() {
        return {
            string: TableUtilities.entityGenerator.String,
            int: TableUtilities.entityGenerator.Int32,
            double: TableUtilities.entityGenerator.Double,
            datetime: TableUtilities.entityGenerator.DateTime,
            boolean: TableUtilities.entityGenerator.Boolean
        }
    }

    createBatch() {
        return new TableBatch();
    }

    /**
     * Function that simplifes creating a new TableQuery from azure-storage
     * 
     * @param {*} top 
     * @param {*} select 
     * @param {*} filter 
     */
    createQuery(top, select, filter) {
        let query = new TableQuery().top(top)
        if (top) query = query.top(top)
        if (select) query = query.select(select)
        if (filter) query = query.where(filter)
        return query
    }

    /**
     * Queries a table using the specified query
     * 
     * @param {*} table 
     * @param {*} query 
     * @param {*} continuationToken 
     */
    queryTable(table, query, continuationToken) {
        return new Promise((resolve, reject) => {
            this.tableService.queryEntities(
                table,
                query,
                continuationToken,
                (error, result) => {
                    if (!error) return resolve(result)
                    else reject(error)
                })
        })
    }

    /**
     * Queries all entries in a table using the specified query
     * 
     * @param {*} table 
     * @param {*} query 
     */
    async queryTableAll(table, query) {
        let token = null
        let { entries, continuationToken } = await this.queryTable(table, query, token)
        token = continuationToken
        while (token != null) {
            let result = await this.queryTable(table, query, token)
            entries.push(...result.entries)
            token = result.continuationToken
        }
        return entries
    }

    /**
     * Retrieves an entity
     * 
     * @param {*} table 
     * @param {*} partitionKey 
     * @param {*} rowKey 
     */
    retrieveEntity(table, partitionKey, rowKey) {
        return new Promise((resolve, reject) => {
            this.tableService.retrieveEntity(table, partitionKey, rowKey, (error, result) => {
                if (!error) {
                    return resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    }

    /**
     * Adds an entity
     * 
     * @param {*} table 
     * @param {*} item 
     */
    addEntity(table, item) {
        return new Promise((resolve, reject) => {
            this.tableService.insertEntity(table, item, (error, result) => {
                if (!error) {
                    return resolve(result['.metadata'])
                } else {
                    reject(error)
                }
            })
        })
    }

    /**
     * Updates the entity
     * 
     * @param {*} table 
     * @param {*} item 
     * @param {*} merge 
     */
    updateEntity(table, item, merge) {
        return new Promise((resolve, reject) => {
            if (merge) {
                this.tableService.insertOrMergeEntity(table, item, undefined, (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })
            } else {
                this.tableService.insertOrReplaceEntity(table, item, undefined, (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })
            }
        })
    }

    /**
     * Delete entity
     * 
     * @param {*} table 
     * @param {*} item 
     */
    deleteEntity(table, item) {
        return new Promise((resolve, reject) => {
            this.tableService.deleteEntity(table, item, undefined, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    }


    /**
     * Executes a batch operation
     * 
     * @param {*} table 
     * @param {*} batch 
     */
    executeBatch(table, batch) {
        return new Promise((resolve, reject) => {
            this.tableService.executeBatch(table, batch, (error, result) => {
                if (!error) {
                    return resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    }
}

module.exports = new TableUtil();