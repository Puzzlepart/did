import * as Mongo from 'mongodb'

export class UserMongoService {
  private _collectionName = 'users'
  private _collection: Mongo.Collection
  /**
   * Constructor
   *
   * @param {Mongo.Db} _client Client
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
  }

  public async getUserById(id: string) {
    try {
      const result = await this._collection.findOne({ id })
      return result
    } catch (err) {
      throw err
    }
  }
}