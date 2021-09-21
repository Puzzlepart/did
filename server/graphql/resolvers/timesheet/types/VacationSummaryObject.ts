/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import DateUtils, { DateWithTimezone } from '../../../../../shared/utils/date'
import { stripHtmlString } from '../../../../utils/stripHtmlString'
import { Customer, EventError, LabelObject, Project } from '../../types'

/**
 * An Object type that describes a VacationSummary
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'An Object type that describes a VacationSummary',
  simpleResolvers: true
})
export class VacationSummary {
  @Field(() => Float)
  total?: number

  @Field(() => Float)
  used?: number

  @Field(() => Float)
  remaining?: number
}
