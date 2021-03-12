/* eslint-disable unicorn/no-array-callback-reference */

import { Collection, Db, FilterQuery, OptionalId } from 'mongodb'
import { Context } from '../../graphql/context'
import { CacheService } from '../cache'

export class MongoDocumentService<T> {
  public cache: CacheService = null
  public collection: Collection<T>

  /**
   * Constructs a new Mongo Document Service
   *
   * Specify cachePrefix to use an underlying CacheService
   *
   * @param context - Injected context through typedi
   * @param collectionName - Colletion name
   * @param cachePrefix - Cache prefix
   * @param database - Database
   */
  constructor(
    public readonly context: Context,
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
   * @param query - Query
   */
  private _extendQuery(query: FilterQuery<T>) {
    return Object.keys(query || {}).reduce((q, key) => {
      const isFalse = query[key] === false
      if (isFalse) {
        q[key] = {
          $in: [false, null]
        }
      } else {
        q[key] = query[key]
      }
      return q
    }, {})
  }

  /**
   * Wrapper on find().toArray()
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
   *
   * @param query - Query
   * @param sort - Sort options
   */
  public find<S = any>(query: FilterQuery<T>, sort?: S) {
    return this.collection.find(this._extendQuery(query), { sort }).toArray()
  }

  /**
   * Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany
   *
   * @param documents_ - Documents
   */
  public insertMultiple(documents_: OptionalId<any>[]) {
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
}
