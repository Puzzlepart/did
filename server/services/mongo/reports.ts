import * as Mongo from 'mongodb'
import { DateObject } from '../../../shared/utils/date.dateObject'
import { TimeEntriesQuery, TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

export class ReportsMongoService extends MongoDocumentService<TimeEntry> {
  constructor(db: Mongo.Db) {
    super(db, 'time_entries')
  }

  /**
   * Get time entries
   *
   * @param {TimeEntriesQuery} query Query
   */
  public async getTimeEntries(query: TimeEntriesQuery): Promise<TimeEntry[]> {
    try {
      const d = new DateObject()
      const q: Mongo.FilterQuery<TimeEntry> = {}
      switch (query.preset) {
        case 'LAST_MONTH': {
          q.month = d.add('-1m').toObject().month - 1
          q.year = d.add('-1m').toObject().year
        }
        case 'CURRENT_MONTH': {
          q.month = d.toObject().month
          q.year = d.toObject().year
        }
        case 'LAST_YEAR': {
          q.year = d.toObject().year - 1
        }
        case 'CURRENT_YEAR': {
          q.year = d.toObject().year
        }
      }
      const timeEntries = await this.find(q)
      return timeEntries
    } catch (err) {
      throw err
    }
  }
}
