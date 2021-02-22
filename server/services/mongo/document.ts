import * as Mongo from 'mongodb'
import Redis from '../../middleware/redis'

export class MongoDocumentService<T> {
  public collection: Mongo.Collection<T>
  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   * @param {string} collectionName Colletion name
   */
  constructor(db: Mongo.Db, public collectionName: string) {
    this.collection = db.collection(collectionName)
  }

  /**
   * Wrapper on find().toArray()
   *
   * @see — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
   *
   * @param {Mongo.FilterQuery<T>} query query
   */
  public find(query: Mongo.FilterQuery<T>) {
    return this.collection.find(query).toArray()
  }

  /**
   * Get from cache by key
   * 
   * @param {string} key Cache key
   */
  public getFromCache<T = any>(key: string): Promise<T> {
    return new Promise((resolve) => {
      Redis.get(key, (err, reply) => {
        if (err) resolve(null)
        else resolve(JSON.parse(reply) as T)
      })
    })
  }

  /**
   * Get from cache by key
   * 
   * @param {string} key Cache key
   * @param {any} value Cache value
   * @param {number} seconds Cache seconds
   */
  public storeInCache(key: string, value: any, seconds: number = 60) {
    return new Promise((resolve) => {
      Redis.setex(key, seconds, JSON.stringify(value), resolve)
    })
  }
}
