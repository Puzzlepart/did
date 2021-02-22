import * as Mongo from 'mongodb'
import { first, omit } from 'underscore'
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
   * @param {boolean} sortAsc Sort ascending
   */
  public async getTimeEntries(query: TimeEntriesQuery, sortAsc: boolean): Promise<TimeEntry[]> {
    try {
      const d = new DateObject()
      let q: Mongo.FilterQuery<TimeEntry> = {}
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
      q = omit({ ...q, query }, 'preset')
      const timeEntries = await this.find(q)
      const timeEntriesSorted = timeEntries.sort(({ startDateTime: a }, { startDateTime: b }) => {
        return sortAsc
          ? new Date(a).getTime() - new Date(b).getTime()
          : new Date(b).getTime() - new Date(a).getTime()
      })
      return timeEntriesSorted
    } catch (err) {
      throw err
    }
  }
}
