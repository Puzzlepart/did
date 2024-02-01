import 'reflect-metadata'
import { Field, Float, Int, ObjectType } from 'type-graphql'

/**
 * Query result object for the `weekStatus` query
 * 
 * @category GraphQL ObjectType
 */
@ObjectType({
    description: 'Query result object for the `weekStatus` query'
})
export class WeekStatusQueryResult {
    /**
     * User ID
     */
    @Field()
    userId: string

    /**
     * Submit status
     * 
     * `0` - Not submitted
     * `1` - Partially submitted (the week is split between months and one of the months is submitted)
     * `2` - Fully submitted
     */
    @Field(() => Int)
    submitStatus: number

    /**
     * Total hours for the week
     */
    @Field(() => Float)
    hours: number

    /**
     * Is the week split between months?
     */
    @Field()
    isWeekSplit: boolean

    /**
     * URL to the timesheet for the provided week
     */
    @Field(() => String)
    url: string
}
