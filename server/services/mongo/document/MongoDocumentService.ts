/* eslint-disable @typescript-eslint/no-var-requires */
import { Collection, Db, FilterQuery, OptionalId } from 'mongodb'
import _ from 'lodash'
import { RequestContext } from '../../../graphql/requestContext'
import { CacheService } from '../../cache'
import { FieldType } from './types'
import { tryParseJson } from '../../../utils'
const log = require('debug')('server/services/cache')

export class MongoDocumentService<T> {
  public cache: CacheService = null
  public collection: Collection<T>
  private _fieldTypes: Record<keyof T, any> = null

  /**
   * Constructer for `MongoDocumentService`
   *
   * Specify `cachePrefix` to use an underlying `CacheService`
   *
   * @param context - Injected context through `typedi`
   * @param collectionName - Collection name
   * @param cachePrefix - Cache prefix
   * @param database - Database
   */
  constructor(
    public readonly context: RequestContext,
    public collectionName: string,
    public cachePrefix?: string,
    database?: Db
  ) {
    this.collection = (database || context.db).collection(collectionName)
    if (cachePrefix) {
      this.cache = new CacheService(this.context, cachePrefix)
    }
  }

  /**
   * Extend query to be able to check for false OR null.
   * Ref: https://stackoverflow.com/questions/11634601/mongodb-null-field-or-true-false
   *
   * @example Query
   *
   * { hiddenFromReports: false }
   *
   * will be converted to
   *
   * { hiddenFromReports: { $in: [false, null] } }
   *
   * @param query - Filter query
   */
  private _extendQuery(query: FilterQuery<T>) {
    return Object.keys(query || {}).reduce((q, key) => {
      const isFalse = query[key] === false
      q[key] = isFalse
        ? {
            $in: [false, null]
          }
        : query[key]
      return q
    }, {})
  }

  private _handleFieldTypes(documents: T[], action: 'get' | 'set') {
    return documents.map((document) => {
      for (const key of Object.keys(document)) {
        if (this._fieldTypes[key] && Boolean(document[key])) {
          switch (this._fieldTypes[key]) {
            case 'JSON': {
              document[key] = action === 'get' ? JSON.stringify(document[key]) : tryParseJson(document[key])
            }
          }
        }
      }
      return document
    })
  }

  /**
   * Wrapper on `_.find().toArray()` that also handles field types like `JSON`.
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
   *
   * @param query - Filter query
   * @param sort - Sort options
   */
  public find<S = any>(query: FilterQuery<T>, sort?: S): Promise<T[]> {
    return this.collection.find(this._extendQuery(query), { sort }).toArray()
  }

  /**
   * Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties
   *
   * @remarks Returns void if documents_ is empty
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany
   *
   * @param documents_ - Documents
   */
  public insertMultiple(documents_: OptionalId<any>[]) {
    if (_.isEmpty(documents_)) return
    const documents = documents_.map((document_) => ({
      ...document_,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    return this.collection.insertMany(documents)
  }

  /**
   * Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
   *
   * @param document_ - Document
   */
  public insert(document_: OptionalId<any>) {
    return this.collection.insertOne({
      ...document_,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  /**
   * Wrapper on updateOne() that also updates `updatedAt` property
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
   *
   * @param query - Query
   * @param document_ - Document
   */
  public update(query: FilterQuery<T>, document_: OptionalId<any>) {
    return this.collection.updateOne(query, {
      $set: {
        ...document_,
        updatedAt: new Date()
      }
    })
  }

  /**
   * Register field type for special handling.
   * 
   * @param fieldName Field name to register
   * @param type The field type
   */
  public registerType(fieldName: keyof T, type: FieldType) {
    this._fieldTypes[fieldName] = type
  }
}
