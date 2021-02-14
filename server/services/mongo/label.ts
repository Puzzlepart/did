import * as Mongo from 'mongodb'
import { LabelObject } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

export class LabelMongoService extends MongoDocumentService<LabelObject> {
  constructor(db: Mongo.Db) {
    super(db, 'labels')
  }

  /**
   * Get labels
   *
   * @param {Mongo.FilterQuery<LabelObject>} query Query
   */
  public async getLabels(query?: Mongo.FilterQuery<LabelObject>): Promise<LabelObject[]> {
    try {
      const labels = await this.find(query)
      return labels
    } catch (err) {
      throw err
    }
  }

  /**
   * Add label
   *
   * @param {LabelObject} label Label
   */
  public async addLabel(label: LabelObject) {
    try {
      const result = await this.collection.insertOne(label)
      return result
    } catch (err) {
      throw err
    }
  }
}
