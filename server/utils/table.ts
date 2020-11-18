import { default as azurestorage, TableUtilities, TableService, TableQuery } from 'azure-storage'
import { omit, isNull, sortBy } from 'underscore'
import { decapitalize, capitalize, isBlank, startsWith } from 'underscore.string'
import get from 'get-value'

interface IConvertToAzEntityOptions {
  removeBlanks?: boolean
  typeMap?: Record<string, 'json' | 'datetime' | 'boolean' | 'number' | 'double'>
}

export interface IQueryAzTableOptions {
  typeMap?: Record<string, 'Custom.ArrayPipe'>
  columnMap?: Record<string, string>
  skipColumns?: string[]
  orderBy?: string
}

type EntityDescriptor = Record<string, TableUtilities.entityGenerator.EntityProperty<any>>

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
   * Supports the builtin types Edm.* and the following custom:
   *
   * * Custom.ArrayPipe
   *
   * @param {EntityDescriptor} entityDescriptor Entity descriptor
   * @param {IQueryAzTableOptions} options Parse options
   */
  parseAzEntity<T = any>(entityDescriptor: EntityDescriptor, options: IQueryAzTableOptions = {}): T {
    const parsedEntity = Object.keys(entityDescriptor).reduce((obj: Record<string, any>, key: string) => {
      const { _, $ } = entityDescriptor[key]
      let value = _
      if (_ === undefined || _ === null) return obj
      if (get(options, `columnMap.${key}`)) {
        obj[get(options, `columnMap.${key}`)] = _
        return obj
      }
      const type: string = get(options, `typeMap.${key}`, { default: $ })
      switch (type) {
        case 'Custom.ArrayPipe':
          value = ((value as string) || '').split('|').filter((p) => p)
          break
        case 'Edm.DateTime':
          value = value.toISOString()
          break
        default:
          if (startsWith(_, 'json:')) value = JSON.parse(value.split('json:')[1])
      }
      return { ...obj, [decapitalize(key)]: value }
    }, {})
    if (!parsedEntity.id) parsedEntity.id = [entityDescriptor.PartitionKey._, entityDescriptor.RowKey._].join(' ')
    return omit(parsedEntity, options.skipColumns || ['timestamp', 'partitionKey']) as T
  }

  /**
   * Parse an array of Azure table storage entities
   *
   * Adds {RowKey} as 'id' and 'key, skips {PartitionKey}
   *
   * @param {TableService.QueryEntitiesResult<any>} result Result
   * @param {IQueryAzTableOptions} options Parse options
   */
  parseAzEntities<T = any>(
    { entries, continuationToken }: TableService.QueryEntitiesResult<any>,
    options: IQueryAzTableOptions
  ) {
    entries = entries.map((ent) => this.parseAzEntity<T>(ent, options))
    return { entries, continuationToken }
  }

  /**
   * entityGenerator from azure-storage TableUtilities
   */
  azEntGen(): { [x: string]: (value: any) => TableUtilities.entityGenerator.EntityProperty<any> } {
    return {
      string: TableUtilities.entityGenerator.String,
      int: TableUtilities.entityGenerator.Int32,
      double: TableUtilities.entityGenerator.Double,
      datetime: TableUtilities.entityGenerator.DateTime,
      boolean: TableUtilities.entityGenerator.Boolean
    }
  }

  /**
   * Query
   */
  query() {
    return {
      string: TableQuery.stringFilter,
      boolean: TableQuery.booleanFilter,
      date: TableQuery.dateFilter,
      int: TableQuery.int32Filter,
      double: TableQuery.doubleFilter,
      combine: TableQuery.combineFilters,
      equal: TableUtilities.QueryComparisons.EQUAL,
      greaterThan: TableUtilities.QueryComparisons.GREATER_THAN,
      greaterThanOrEqual: TableUtilities.QueryComparisons.GREATER_THAN_OR_EQUAL,
      lessThan: TableUtilities.QueryComparisons.LESS_THAN,
      lessThanOrEqual: TableUtilities.QueryComparisons.LESS_THAN_OR_EQUAL,
      and: TableUtilities.TableOperators.AND
    }
  }

  /**
   * Converts the date string to azure table storage date format
   *
   * @param {string | number | Date} dateString The date string to convert
   */
  convertToAzDate(dateString: string | number | Date) {
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
  createAzQuery(top: number, filters: any[] = null): TableQuery {
    let query = new TableQuery().top(top)
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
   * @param {TableQuery} query Table query
   * @param {Object} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
   * @param {string} continuationToken Continuation token
   */
  queryAzTable<T = any>(
    table: string,
    query: TableQuery,
    options?: IQueryAzTableOptions,
    continuationToken: TableService.TableContinuationToken = null
  ): Promise<TableService.QueryEntitiesResult<any>> {
    return new Promise<TableService.QueryEntitiesResult<any>>((resolve, reject) => {
      this.tableService.queryEntities(table, query, continuationToken, (error, result) => {
        if (!error) {
          if (options) {
            const _result = this.parseAzEntities<T>(result, options)
            if (options.orderBy) {
              _result.entries = sortBy(_result.entries, options.orderBy)
            }
            resolve(_result)
          } else {
            resolve(result)
          }
        } else reject(error)
      })
    })
  }

  /**
   * Queries all entries in a table using the specified query
   *
   * @param {string} table Table name
   * @param {TableQuery} query Table query
   * @param {Record<string, string>} columnMap Column mapping, e.g. for mapping RowKey and PartitionKey
   */
  async queryAzTableAll(table: string, query: TableQuery, columnMap: Record<string, string>) {
    let token = null
    const { entries, continuationToken } = await this.queryAzTable(table, query, { columnMap }, token)
    token = continuationToken
    while (token !== null) {
      const result: TableService.QueryEntitiesResult<any> = await this.queryAzTable(table, query, { columnMap }, token)
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
   * @param {IConvertToAzEntityOptions} options Options (removeBlanks defaults to true, typeMap defaults to empty object)
   */
  convertToAzEntity(
    rowKey: string,
    values: Record<string, any>,
    partitionKey: string = 'Default',
    options: IConvertToAzEntityOptions = { removeBlanks: true, typeMap: {} }
  ): EntityDescriptor {
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
    return omit(entityDescriptor, (prop: TableUtilities.entityGenerator.EntityProperty<any>) =>
      options.removeBlanks ? isBlank(prop._) : false
    )
  }

  /**
   * Retrieves an entity by partion key and row key
   *
   * @param {string} table Table name
   * @param {string} rowKey Row key
   * @param {IQueryAzTableOptions} options Parse options
   * @param {string} partitionKey Partition key (defaults to Default)
   */
  retrieveAzEntity<T = any>(
    table: string,
    rowKey: string,
    options: IQueryAzTableOptions,
    partitionKey: string = 'Default'
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.tableService.retrieveEntity<any>(table, partitionKey, rowKey, (error, result) => {
        if (error) reject(error)
        else {
          resolve(options ? this.parseAzEntity<T>(result, options) : result)
        }
      })
    })
  }

  /**
   * Adds an entity
   *
   * @param {string} table Table name
   * @param {any} entityDescriptor Entity descriptor
   */
  addAzEntity(table: string, entityDescriptor: any): Promise<TableService.EntityMetadata> {
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
  updateAzEntity(table: string, entityDescriptor: any, merge?: boolean): Promise<TableService.EntityMetadata> {
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
   * @param {string} table Table name
   * @param {any} entityDescriptor Entity desccriptor
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
   * @param {string} table Table name
   * @param {azurestorage.TableBatch} batch Table batch
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
