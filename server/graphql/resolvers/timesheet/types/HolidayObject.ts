import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

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
}
