import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'

/**
 * Input for setting an event as ignored/un-ignored in the timesheet.
 *
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input for ignoring/un-ignoring a timesheet event'
})
export class TimesheetIgnoreEventInput {
  /**
   * Period ID the event belongs to
   */
  @Field({ description: 'Period ID the event belongs to' })
  periodId: string

  /**
   * Event ID (MS Graph event ID)
   */
  @Field({ description: 'Event ID (MS Graph event ID)' })
  eventId: string

  /**
   * Whether to ignore (true) or un-ignore (false) the event
   */
  @Field({ description: 'Whether to ignore (true) or un-ignore (false)' })
  ignored: boolean
}
