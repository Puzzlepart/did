import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { environment } from '../../utils'
import { MongoDocumentService } from './@document'

/**
 * Holidays service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class HolidaysService extends MongoDocumentService<any> {
  /**
   * Constructor for `HolidaysService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(
      context,
      'holidays',
      null,
      context?.mcl?.db(environment('MONGO_DB_DB_NAME'))
    )
  }
}