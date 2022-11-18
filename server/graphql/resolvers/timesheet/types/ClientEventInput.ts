import 'reflect-metadata'
import { Field, Float, InputType, Int } from 'type-graphql'

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for ClientEvent'
})
export class ClientEventInput {
  @Field()
  id: string

  @Field()
  projectId: string

  @Field({ nullable: true })
  manualMatch: boolean

  @Field({ nullable: true })
  startDateTime?: Date

  @Field({ nullable: true })
  endDateTime?: Date

  @Field(() => Float, { nullable: true })
  originalDuration?: number

  @Field(() => Float, { nullable: true })
  duration?: number

  @Field(() => Int, { nullable: true })
  adjustedMinutes?: number
}
