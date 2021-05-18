/* eslint-disable tsdoc/syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for Label used in Mutation addOrUpdateLabel'
})
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

/**
 * @category GraphQL ObjectType
 */
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
   * @param input - Input
   */
  constructor(input?: LabelInput) {
    Object.assign(this, input || {})
  }
}
