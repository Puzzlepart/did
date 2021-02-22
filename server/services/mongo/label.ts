import {
  Db as MongoDatabase,
  DeleteWriteOpResultObject,
  FilterQuery,
  InsertOneWriteOpResult,
  WithId
} from 'mongodb'
import { pick } from 'underscore'
import { LabelObject as Label } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class LabelMongoService extends MongoDocumentService<Label> {
  constructor(db: MongoDatabase) {
    super(db, 'labels')
  }

  /**
   * Get labels
   *
   * @param {FilterQuery<Label>} query Query
   */
  public async getLabels(query?: FilterQuery<Label>): Promise<Label[]> {
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
  public async addLabel(label: Label): Promise<InsertOneWriteOpResult<WithId<Label>>> {
    try {
      const result = await this.collection.insertOne(label)
      return result
    } catch (err) {
      throw err
    }
  }

  /**
   * Update label
   *
   * @param {Label} label Label
   */
  public async updateLabel(label: Label): Promise<void> {
    try {
      await this.collection.updateOne(pick(label, 'name'), { $set: label })
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete label by name
   *
   * @param {string} name Name
   */
  public async deleteLabel(name: string): Promise<DeleteWriteOpResultObject> {
    try {
      const result = await this.collection.deleteOne({ name })
      return result
    } catch (err) {
      throw err
    }
  }
}
