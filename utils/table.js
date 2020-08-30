const az = require('azure-storage')
const { omit } = require('underscore')
const { decapitalize, capitalize, isBlank } = require('underscore.string')
const { reduceEachLeadingCommentRange } = require('typescript')

class TableUtil {
    constructor(tableService) {
        this.tableService = tableService
    }

    /**
     * Parse an table storage entity
     * 
     * In the azure table entity we'll find the value in _ and the type in $
     * 
     * @param {*} result Result
     * @param {*} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
     */
    parseEntity(entity, columnMap = {}) {
        return Object.keys(entity).reduce((obj, key) => {
            const { _, $ } = entity[key]
            if (_ === undefined || _ === null) return obj;
            if (columnMap[key]) {
                obj[columnMap[key]] = _
                return obj
            }
            switch ($) {
                case 'Edm.DateTime': obj[decapitalize(key)] = _.toISOString()
                    break
                default: obj[decapitalize(key)] = _
            }
            return obj
        }, {})
    }

    /**
     * Parse an array of Azure table storage entities
     * 
     * Adds {RowKey} as 'id' and 'key, skips {PartitionKey}
     * 
     * @param {*} result Result
     * @param {*} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
     */
    parseEntities({ entries, continuationToken }, columnMap) {
        entries = entries.map(ent => this.parseEntity(ent, columnMap))
        return { entries, continuationToken }
    }

    /**
     * entityGenerator from azure-storage TableUtilities
     */
    entGen() {
        return {
            string: az.TableUtilities.entityGenerator.String,
            int: az.TableUtilities.entityGenerator.Int32,
            double: az.TableUtilities.entityGenerator.Double,
            datetime: az.TableUtilities.entityGenerator.DateTime,
            boolean: az.TableUtilities.entityGenerator.Boolean
        }
    }

    /**
     * Query
     */
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

    /**
     * Create table batch
     */
    createBatch() {
        return new az.TableBatch()
    }

    /**
     * Function that simplifes creating a new TableQuery from azure-storage
     * 
     * @param {*} top Number of items to retrieve
     * @param {*} select Columns to retrieve
     * @param {*} filters Filters
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

    /**
     * Combine an array of filters
     * 
     * @param filters Filter array
     */
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
     * @param {*} table Table name
     * @param {*} query Table query
     * @param {*} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
     * @param {*} continuationToken Continuation token
     */
    queryTable(table, query, columnMap, continuationToken) {
        return new Promise((resolve, reject) => {
            this.tableService.queryEntities(
                table,
                query,
                continuationToken,
                (error, result) => {
                    if (!error) {
                        return columnMap
                            ? resolve(this.parseEntities(result, columnMap))
                            : resolve(result)
                    }
                    else reject(error)
                })
        })
    }

    /**
     * Queries all entries in a table using the specified query
     * 
     * @param {*} table Table name
     * @param {*} query Table query
     * @param {*} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
     */
    async queryTableAll(table, query, columnMap) {
        let token = null
        let { entries, continuationToken } = await this.queryTable(table, query, columnMap, token)
        token = continuationToken
        while (token != null) {
            let result = await this.queryTable(table, query, columnMap, token)
            entries.push(...result.entries)
            token = result.continuationToken
        }
        return entries
    }


    /**
     * Make entity
     * 
     * @param {*} rowKey Row key
     * @param {*} values Values
     * @param {*} partitionKey Partition key     * 
     * @param {*} typesMap Types map
     */
    makeEntity(rowKey, values, partitionKey = 'Default', typesMap = {}) {
        const { string, datetime, double, int, boolean } = this.entGen()
        const entity = Object.keys(values)
            .filter(key => !isBlank(values[key]))
            .reduce((obj, key) => {
                let value
                switch (typeof values[key]) {
                    case 'boolean': value = boolean(values[key])
                        break
                    case 'number': {
                        if (values[key] % 1 === 0) value = int(values[key])
                        else value = double(values[key])
                    }
                        break
                    default: {
                        const isDate = Date.parse(values[key]) > 0
                        if (isDate) value = datetime(new Date(values[key]))
                        else value = string(values[key])
                    }
                        break
                }
                obj[capitalize(key)] = value
                return obj
            }, {
                PartitionKey: string(partitionKey),
                RowKey: string(rowKey),
            })
        return omit(entity, ({ _ }) => isBlank(_))
    }

    /**
     * Retrieves an entity
     * 
     * @param {*} table Table name
     * @param {*} partitionKey Partition key
     * @param {*} rowKey Row key
     */
    retrieveEntity(table, partitionKey, rowKey) {
        return new Promise((resolve, reject) => {
            this.tableService.retrieveEntity(table, partitionKey, rowKey, (error, result) => {
                if (error) reject(error)
                else return resolve(result)
            })
        })
    }

    /**
     * Adds an entity
     * 
     * @param {*} table Table name
     * @param {*} entity Entity
     */
    addEntity(table, entity) {
        return new Promise((resolve, reject) => {
            this.tableService.insertEntity(table, entity, (error, result) => {
                if (error) reject(error)
                else return resolve(result['.metadata'])
            })
        })
    }

    /**
     * Updates the entity
     * 
     * @param {*} table Table name
     * @param {*} entity Entity
     * @param {*} merge If the entity should be inserted using insertOrMergeEntity
     */
    updateEntity(table, entity, merge) {
        return new Promise((resolve, reject) => {
            if (merge) {
                this.tableService.insertOrMergeEntity(table, entity, undefined, (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })
            } else {
                this.tableService.insertOrReplaceEntity(table, entity, undefined, (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })
            }
        })
    }

    /**
     * Delete entity
     * 
     * @param {*} table Table name
     * @param {*} entity Entity
     */
    deleteEntity(table, entity) {
        return new Promise((resolve, reject) => {
            this.tableService.deleteEntity(table, entity, undefined, (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }


    /**
     * Executes a batch operation
     * 
     * @param {*} table Table name
     * @param {*} batch Table batch
     */
    executeBatch(table, batch) {
        return new Promise((resolve, reject) => {
            this.tableService.executeBatch(table, batch, (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }
}

module.exports = TableUtil