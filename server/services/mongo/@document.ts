/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, FilterQuery, OptionalId } from 'mongodb'
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
   */
  constructor(
    public readonly context: Context,
    public collectionName: string,
    public cachePrefix?: string
  ) {
    this.collection = context.db.collection(collectionName)
    if (cachePrefix) {
      this.cache = new CacheService(this.context, cachePrefix)
    }
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
    return this.collection.find(query, { sort }).toArray()
  }

  /**
   * Wrapper on insertOne() that also updates `updatedAt` and `createdAt` properties
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
      ...document_,
      updatedAt: new Date()
    })
  }
}
