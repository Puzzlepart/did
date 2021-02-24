/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { ObjectType, InputType, Field, ID } from 'type-graphql'

@InputType({ description: 'Input object for Label used in Mutation addOrUpdateLabel' })
export class LabelInput {
  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field()
  color: string

  @Field({ nullable: true, defaultValue: null })
  icon?: string
}

@ObjectType({
  description: 'A type that describes a LabelObject',
  simpleResolvers: true
})
export class LabelObject {
  _id: string

  @Field(() => ID)
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field()
  color: string

  @Field({ nullable: true, defaultValue: null })
  icon?: string

  /**
   * Constructs a new Label
   *
   * @param {LabelInput} input Input
   */
  constructor(input?: LabelInput) {
    Object.assign(this, input || {})
  }
}