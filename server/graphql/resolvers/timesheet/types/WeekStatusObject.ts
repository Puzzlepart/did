import 'reflect-metadata'
import { Field, Int, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
    description: 'Object for WeekStatus'
})
export class WeekStatusObject {
    @Field()
    userId: string

    @Field()
    submitted: boolean

    @Field(() => Int)
    hours: number
}
