import * as Mongo from 'mongodb'
import { TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

export class ReportsMongoService extends MongoDocumentService<TimeEntry> {
  constructor(db: Mongo.Db) {
    super(db, 'time_entries')
  }

  /**
   * Get time entries
   *
   * @param {Mongo.FilterQuery<TimeEntry>} query Query
   */
  public async getTimeEntries(query?: Mongo.FilterQuery<TimeEntry>): Promise<TimeEntry[]> {
    try {
      const timeEntries = await this.find(query)
      return timeEntries
    } catch (err) {
      throw err
    }
  }
}
