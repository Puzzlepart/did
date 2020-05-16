const az = require('azure-storage')

class TableUtil {
    parseEntity(ent, colMap) {
        colMap = colMap || {}
        let parsed = Object.keys(ent)
            .reduce((obj, key) => {
                const newKey = key.charAt(0).toLowerCase() + key.slice(1)
                const value = ent[key]._
                if (colMap[key]) {
                    obj[colMap[key]] = value
                    return obj
                }
                switch (ent[key].$) {
                    case 'Edm.DateTime': obj[newKey] = value.toISOString()
                        break
                    default: obj[newKey] = value
                }
                return obj
            }, {})
        return parsed
    }

    /**
     * Parse an array of Azure table storage entities
     * 
     * Adds {RowKey} as 'id' and 'key, skips {PartitionKey}
     * 
     * @param {*} result Result
     * @param {*} colMap Column map
     */
    parseEntities({ entries, continuationToken }, colMap) {
        colMap = colMap || {}
        entries = entries.map(ent => this.parseEntity(ent, colMap))
        return { entries, continuationToken }
    }

    entGen() {
        return {
            string: az.TableUtilities.entityGenerator.String,
            int: az.TableUtilities.entityGenerator.Int32,
            double: az.TableUtilities.entityGenerator.Double,
            datetime: az.TableUtilities.entityGenerator.DateTime,
            boolean: az.TableUtilities.entityGenerator.Boolean
        }
    }

    query() {
        return {
            string: az.TableQuery.stringFilter,
            boolean: az.TableQuery.booleanFilter,
            date: az.TableQuery.dateFilter,
            int: az.TableQuery.int32Filter,
            double: az.TableQuery.doubleFilter,
            combine: az.TableQuery.combineFilters,
            equal: az.TableUtilities.QueryComparisons.EQUAL,
            greaterThan: az.TableUtilities.QueryComparisons.GREATER_THAN,
            lessThan: az.TableUtilities.QueryComparisons.LESS_THAN,
            and: az.TableUtilities.TableOperators.AND
        }
    }

    /**
     * Converts the date string to azure table storage date format
     * 
     * @param dateString The date string to convert
     */
    convertDate(dateString) {
        if (dateString) return this.entGen().datetime(new Date(dateString))._
        return null
    }

    createBatch() {
        return new az.TableBatch()
    }

    /**
     * Function that simplifes creating a new TableQuery from azure-storage
     * 
     * @param {*} top 
     * @param {*} select 
     * @param {*} filters 
     */
    createQuery(top, select, filters) {
        let query = new az.TableQuery().top(top)
        if (top) query = query.top(top)
        if (select) query = query.select(select)
        if (filters) {
            const combined = this.combineFilters(filters)
            if (combined) query = query.where(combined)
        }
        return query
    }

    combineFilters(filters) {
        const { combine, and } = this.query()
        return filters.reduce((combined, [col, value, type, comp]) => {
            if (value) {
                let filter = type(col, comp, value)
                combined = combined ? combine(combined, and, filter) : filter
            }
            return combined;
        }, null);
    }

    /**
     * Queries a table using the specified query
     * 
     * @param {*} table 
     * @param {*} query 
     * @param {*} parse 
     * @param {*} continuationToken 
     */
    queryTable(table, query, parse, continuationToken) {
        return new Promise((resolve, reject) => {
            this.tableService.queryEntities(
                table,
                query,
                continuationToken,
                (error, result) => {
                    if (!error) {
                        return parse
                            ? resolve(this.parseEntities(result, parse))
                            : resolve(result)
                    }
                    else reject(error)
                })
        })
    }

    /**
     * Queries all entries in a table using the specified query
     * 
     * @param {*} table 
     * @param {*} query 
     * @param {*} parse 
     */
    async queryTableAll(table, query, parse) {
        let token = null
        let { entries, continuationToken } = await this.queryTable(table, query, parse, token)
        token = continuationToken
        while (token != null) {
            let result = await this.queryTable(table, query, parse, token)
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

module.exports = new TableUtil()