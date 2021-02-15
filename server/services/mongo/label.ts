import * as Mongo from 'mongodb'
import { LabelObject as Label } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

export class LabelMongoService extends MongoDocumentService<Label> {
  constructor(db: Mongo.Db) {
    super(db, 'labels')
  }

  /**
   * Get labels
   *
   * @param {Mongo.FilterQuery<Label>} query Query
   */
  public async getLabels(query?: Mongo.FilterQuery<Label>): Promise<Label[]> {
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
   * @param {Label} label Label
   */
  public async addLabel(label: Label) {
    try {
      const result = await this.collection.insertOne(label)
      return result
    } catch (err) {
      throw err
    }
  }
}
