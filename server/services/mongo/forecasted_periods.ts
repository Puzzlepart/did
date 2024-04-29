import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'

/**
 * Forecasted periods service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ForecastedPeriodsService extends MongoDocumentService<any> {
  /**
   * Constructor for `ForecastedPeriodsService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'forecasted_periods')
  }
}
