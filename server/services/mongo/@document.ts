import { Collection, FilterQuery, SortOptionObject } from 'mongodb'
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
   * @param {Context} context Context
   * @param {string} collectionName Colletion name
   * @param {string} cachePrefix Cache prefix
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
   * @see — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
   *
   * @param {FilterQuery<T>} query Query
   * @param {Array<[string, number]> | SortOptionObject<T>} sort Sort
   */
  public find(query: FilterQuery<T>, sort?: Array<[string, number]> | SortOptionObject<T>) {
    return this.collection.find(query, { sort }).toArray()
  }
}
