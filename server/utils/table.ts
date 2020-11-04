import azurestorage from 'azure-storage'
import { omit, isNull } from 'underscore'
import { decapitalize, capitalize, isBlank, startsWith } from 'underscore.string'
import get from 'get-value'

class AzTableUtilities {
  public tableService: azurestorage.services.table.TableService

  constructor(tableService: azurestorage.services.table.TableService = null) {
    this.tableService = tableService
  }

  /**
   * Parse an table storage entity
   *
   * In the azure table entity we'll find the value in _ and the type in $
   *
   * If the value starts with 'json:', we parse it as JSON
   *
   * @param {Record<string,azurestorage.TableUtilities.entityGenerator.EntityProperty<any>>} entityDescriptor Entity descriptor
   * @param {Record<string, string>} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
   */
  parseAzEntity(
    entityDescriptor: Record<string, azurestorage.TableUtilities.entityGenerator.EntityProperty<any>>,
    columnMap: Record<string, string> = {}
  ) {
    return Object.keys(entityDescriptor).reduce((obj: { [x: string]: any }, key: string) => {
      const { _, $ } = entityDescriptor[key]
      let value = _
      if (_ === undefined || _ === null) return obj
      if (columnMap[key]) {
        obj[columnMap[key]] = _
        return obj
      }
      switch ($) {
        case 'Edm.DateTime':
          value = value.toISOString()
          break
        default:
          if (startsWith(_, 'json:')) value = JSON.parse(value.split('json:')[1])
      }
      return { ...obj, [decapitalize(key)]: value }
    }, {})
  }

  /**
   * Parse an array of Azure table storage entities
   *
   * Adds {RowKey} as 'id' and 'key, skips {PartitionKey}
   *
   * @param {azurestorage.TableService.QueryEntitiesResult<any} result Result
   * @param {Record<string, string>} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
   */
  parseAzEntities(
    { entries, continuationToken }: azurestorage.TableService.QueryEntitiesResult<any>,
    columnMap: Record<string, string>
  ) {
    entries = entries.map((ent) => this.parseAzEntity(ent, columnMap))
    return { entries, continuationToken }
  }

  /**
   * entityGenerator from azure-storage TableUtilities
   */
  azEntGen(): { [x: string]: (value: any) => azurestorage.TableUtilities.entityGenerator.EntityProperty<any> } {
    return {
      string: azurestorage.TableUtilities.entityGenerator.String,
      int: azurestorage.TableUtilities.entityGenerator.Int32,
      double: azurestorage.TableUtilities.entityGenerator.Double,
      datetime: azurestorage.TableUtilities.entityGenerator.DateTime,
      boolean: azurestorage.TableUtilities.entityGenerator.Boolean
    }
  }

  /**
   * Query
   */
  query() {
    return {
      string: azurestorage.TableQuery.stringFilter,
      boolean: azurestorage.TableQuery.booleanFilter,
      date: azurestorage.TableQuery.dateFilter,
      int: azurestorage.TableQuery.int32Filter,
      double: azurestorage.TableQuery.doubleFilter,
      combine: azurestorage.TableQuery.combineFilters,
      equal: azurestorage.TableUtilities.QueryComparisons.EQUAL,
      greaterThan: azurestorage.TableUtilities.QueryComparisons.GREATER_THAN,
      greaterThanOrEqual: azurestorage.TableUtilities.QueryComparisons.GREATER_THAN_OR_EQUAL,
      lessThan: azurestorage.TableUtilities.QueryComparisons.LESS_THAN,
      lessThanOrEqual: azurestorage.TableUtilities.QueryComparisons.LESS_THAN_OR_EQUAL,
      and: azurestorage.TableUtilities.TableOperators.AND
    }
  }

  /**
   * Converts the date string to azure table storage date format
   *
   * @param {string | number | Date} dateString The date string to convert
   */
  convertDate(dateString: string | number | Date) {
    if (dateString) return this.azEntGen().datetime(new Date(dateString))._
    return null
  }

  /**
   * Create table batch
   */
  createAzBatch() {
    return new azurestorage.TableBatch()
  }

  /**
   * Function that simplifes creating a new TableQuery from azure-storage
   *
   * @param {number} top Number of items to retrieve
   * @param {any[]} filters Filters
   */
  createAzQuery(top: number, filters: any[] = null): azurestorage.TableQuery {
    let query = new azurestorage.TableQuery().top(top)
    if (top) query = query.top(top)
    if (filters) {
      const combined = this.combineAzFilters(filters)
      if (combined) query = query.where(combined)
    }
    return query
  }

  /**
   * Combine an array of filters
   *
   * @param {any[]} filters Filter array
   */
  combineAzFilters(filters: any[]) {
    const { combine, and } = this.query()
    return filters.reduce((combined: string, [col, value, type, comp]: any) => {
      if (value) {
        const filter = type(col, comp, value)
        combined = combined ? combine(combined, and, filter) : filter
      }
      return combined
    }, null)
  }

  /**
   * Queries a table using the specified query
   *
   * @param {string} table Table name
   * @param {azurestorage.TableQuery} query Table query
   * @param {Object} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
   * @param {string} continuationToken Continuation token
   */
  queryAzTable(
    table: string,
    query: azurestorage.TableQuery,
    columnMap?: any,
    continuationToken: azurestorage.TableService.TableContinuationToken = null
  ): Promise<azurestorage.TableService.QueryEntitiesResult<any>> {
    return new Promise<azurestorage.TableService.QueryEntitiesResult<any>>((resolve, reject) => {
      this.tableService.queryEntities(table, query, continuationToken, (error, result) => {
        if (!error) {
          return columnMap ? resolve(this.parseAzEntities(result, columnMap)) : resolve(result)
        } else reject(error)
      })
    })
  }

  /**
   * Queries all entries in a table using the specified query
   *
   * @param {string} table Table name
   * @param {azurestorage.TableQuery} query Table query
   * @param {Record<string, string>} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
   */
  async queryAzTableAll(table: string, query: azurestorage.TableQuery, columnMap: Record<string, string>) {
    let token = null
    const { entries, continuationToken } = await this.queryAzTable(table, query, columnMap, token)
    token = continuationToken
    while (token !== null) {
      const result: azurestorage.TableService.QueryEntitiesResult<any> = await this.queryAzTable(
        table,
        query,
        columnMap,
        token
      )
      entries.push(...result.entries)
      token = result.continuationToken
    }
    return entries
  }

  /**
   * Converts a JSON object to an Azure Table Storage entity
   *
   * Does a best effort to get the correct type of the values
   *
   * Can be some issues to differ between double and int
   *
   * If unsure, specifiy typeMap in options
   *
   * @param {string} rowKey Row key
   * @param {Record} values Values
   * @param {string} partitionKey Partition key
   * @param {*} options Options (removeBlanks defaults to true, typeMap defaults to empty object)
   */
  convertToAzEntity(
    rowKey: string,
    values: Record<string, any>,
    partitionKey = 'Default',
    options: { removeBlanks?: boolean; typeMap?: Record<string, string> } = { removeBlanks: true, typeMap: {} }
  ): Record<string, azurestorage.TableUtilities.entityGenerator.EntityProperty<any>> {
    const { string, datetime, double, int, boolean } = this.azEntGen()
    const entityDescriptor = Object.keys(values)
      .filter((key) => !isNull(values[key]))
      .filter((key) => (options.removeBlanks ? !isBlank(values[key]) : true))
      .reduce(
        (obj, key) => {
          let value: any = values[key]
          const type: string = get(options, `typeMap.${key}`, { default: typeof value })
          switch (type) {
            case 'json':
              value = string(`json:${JSON.stringify(value)}`)
              break
            case 'datetime':
              value = datetime(new Date(value))
              break
            case 'boolean':
              value = boolean(value)
              break
            case 'number':
              {
                if (value % 1 === 0) value = int(value)
                else value = double(value)
              }
              break
            default:
              {
                if (!!type) value = this.azEntGen()[type](value)
                else value = string(value.trim())
              }
              break
          }
          return { ...obj, [capitalize(key)]: value }
        },
        {
          PartitionKey: string(partitionKey),
          RowKey: string(rowKey)
        }
      )
    return omit(entityDescriptor, (prop: azurestorage.TableUtilities.entityGenerator.EntityProperty<any>) =>
      options.removeBlanks ? isBlank(prop._) : false
    )
  }

  /**
   * Retrieves an entity by partion key and row key
   *
   * @param {*} table Table name
   * @param {*} partitionKey Partition key
   * @param {*} rowKey Row key
   */
  retrieveAzEntity(table: string, partitionKey: string, rowKey: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.tableService.retrieveEntity(table, partitionKey, rowKey, (error, result) => {
        if (error) reject(error)
        else return resolve(result)
      })
    })
  }

  /**
   * Adds an entity
   *
   * @param {string} table Table name
   * @param {*} entityDescriptor Entity descriptor
   */
  addAzEntity(table: string, entityDescriptor: any): Promise<azurestorage.TableService.EntityMetadata> {
    return new Promise((resolve, reject) => {
      this.tableService.insertEntity(table, entityDescriptor, (error, result) => {
        if (error) reject(error)
        else return resolve(result)
      })
    })
  }

  /**
   * Updates the entity
   *
   * @param {string} table Table name
   * @param {any} entityDescriptor Entity descriptor
   * @param {boolean} merge If the entity should be inserted using insertOrMergeEntity
   */
  updateAzEntity(
    table: string,
    entityDescriptor: any,
    merge: boolean
  ): Promise<azurestorage.TableService.EntityMetadata> {
    return new Promise((resolve, reject) => {
      if (merge) {
        this.tableService.insertOrMergeEntity(table, entityDescriptor, undefined, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
      } else {
        this.tableService.insertOrReplaceEntity(table, entityDescriptor, undefined, (error, result) => {
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
   * @param {*} entityDescriptor Entity desccriptor
   */
  deleteEntity(table: string, entityDescriptor: any) {
    return new Promise((resolve, reject) => {
      this.tableService.deleteEntity(table, entityDescriptor, undefined, (error, result) => {
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
  executeBatch(table: string, batch: azurestorage.TableBatch) {
    return new Promise((resolve, reject) => {
      this.tableService.executeBatch(table, batch, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }
}

export default AzTableUtilities
