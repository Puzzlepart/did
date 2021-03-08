/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { MongoDocumentService } from './@document'

@Service({ global: false })
export class ConfirmedPeriodsService extends MongoDocumentService<any> {
  /**
   * Constructor for ConfirmedPeriodsService
   *
   * @param context - Injected context through typedi
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(context, 'confirmed_periods')
  }
}
