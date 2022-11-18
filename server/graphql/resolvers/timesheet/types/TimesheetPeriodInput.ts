import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'
import { ClientEventInput } from './ClientEventInput'

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for TimesheetPeriod'
})
export class TimesheetPeriodInput {
  @Field()
  id: string

  @Field()
  startDate: string

  @Field()
  endDate: string

  @Field(() => [ClientEventInput])
  matchedEvents: ClientEventInput[]

  @Field({ nullable: true })
  forecastedHours: number
}
