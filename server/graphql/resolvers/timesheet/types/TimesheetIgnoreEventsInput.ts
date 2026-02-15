import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'

/**
 * Input type for ignoring multiple timesheet events at once.
 *
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input type for ignoring multiple timesheet events'
})
export class TimesheetIgnoreEventsInput {
  @Field()
  periodId: string

  @Field(() => [String])
  eventIds: string[]
}
