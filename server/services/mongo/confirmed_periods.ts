import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './@document'

/**
 * Confirmed periods service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ConfirmedPeriodsService extends MongoDocumentService<any> {
  /**
   * Constructor for `ConfirmedPeriodsService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'confirmed_periods')
  }
}
