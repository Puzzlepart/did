import * as Mongo from 'mongodb'
import { Project } from '../../graphql/resolvers/types'

export class ProjectMongoService {
  private _collectionName = 'projects'
  private _collection: Mongo.Collection<Project>
  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
  }
}
