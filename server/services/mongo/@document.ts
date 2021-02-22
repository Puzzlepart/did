import { Collection, Db as MongoDatabase, FilterQuery, SortOptionObject } from 'mongodb'

export class MongoDocumentService<T> {
  public collection: Collection<T>
  /**
   * Constructor
   *
   * @param {MongoDatabase} db Mongo database
   * @param {string} collectionName Colletion name
   */
  constructor(db: MongoDatabase, public collectionName: string) {
    this.collection = db.collection(collectionName)
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
