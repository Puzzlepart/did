/* eslint-disable max-classes-per-file */
import * as Mongo from 'mongodb'
import co from 'co'

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
    const collection = this._collection
    try {
      return await co(function* () {
        const result = yield collection.findOne({ id })
        return result
      })
    } catch (err) {
      throw err
    }
  }
}