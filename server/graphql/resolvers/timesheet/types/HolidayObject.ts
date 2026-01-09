import 'reflect-metadata'
import { Field, Float, ID, ObjectType } from 'type-graphql'

/**
 * An Object type that describes a Holiday
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'An Object type that describes a Holiday',
  simpleResolvers: true
})
export class HolidayObject {
  @Field(() => ID)
  _id: string

  @Field()
  date?: Date

  @Field()
  name?: string

  /**
   * Number of hours off for this holiday (0-8).
   * 8 = full day off, 4 = half day, 0 = working day
   */
  @Field(() => Float, { nullable: true, defaultValue: 8 })
  hoursOff?: number

  /**
   * Whether this holiday recurs annually
   */
  @Field({ nullable: true, defaultValue: true })
  recurring?: boolean

  /**
   * Optional notes about company-specific rules for this holiday
   */
  @Field({ nullable: true })
  notes?: string

  /**
   * Period ID this holiday belongs to (for filtering)
   */
  @Field({ nullable: true })
  periodId?: string
}
