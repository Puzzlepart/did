/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { MongoDocumentService } from './@document'

@Service({ global: false })
export class ForecastedPeriodsService extends MongoDocumentService<any> {
  /**
   * Constructor for ForecastedPeriodsService
   *
   * @param context - Injected context through typedi
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(context, 'forecasted_periods')
  }
}