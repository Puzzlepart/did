import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

@Service({ global: false })
export class TimeEntryService extends MongoDocumentService<TimeEntry> {
  /**
   * Constructor for TimeEntryService
   *
   * @param context - Injected context through typedi
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(context, 'time_entries')
  }
}