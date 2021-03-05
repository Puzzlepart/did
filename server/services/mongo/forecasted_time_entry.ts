import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

@Service({ global: false })
export class ForecastedTimeEntryService extends MongoDocumentService<TimeEntry> {
  /**
   * Constructor for ReportsService
   *
   * @param context - Context
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(context, 'forecasted_time_entries')
  }
}
