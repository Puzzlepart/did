/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'
import { EventInput } from './EventInput'

/**
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for TimesheetPeriod used in Mutation unsubmitPeriod'
})
export class TimesheetPeriodInput {
  @Field()
  id: string

  @Field()
  startDate: string

  @Field()
  endDate: string

  @Field(() => [EventInput])
  matchedEvents: EventInput[]

  @Field({ nullable: true })
  forecastedHours: number
}
