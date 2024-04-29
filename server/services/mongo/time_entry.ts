import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

/**
 * Time entry service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class TimeEntryService extends MongoDocumentService<TimeEntry> {
  /**
   * Constructor for `TimeEntryService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'time_entries')
  }
}
