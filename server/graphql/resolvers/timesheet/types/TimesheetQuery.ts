/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'

/**
 * @category GraphQL InputType
 */
@InputType()
export class TimesheetQuery {
  @Field()
  startDate: string

  @Field()
  endDate: string
}
