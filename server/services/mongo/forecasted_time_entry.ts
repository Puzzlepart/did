import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

/**
 * Forecasted time entries service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ForecastedTimeEntryService extends MongoDocumentService<TimeEntry> {
  /**
   * Constructor for `ForecastedTimeEntryService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'forecasted_time_entries')
  }
}
