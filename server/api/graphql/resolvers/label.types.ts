/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType({ description: 'A type that describes a LabelObject' })
export class LabelObject {
  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field()
  color: string

  @Field({ nullable: true, defaultValue: null })
  icon?: string
}

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
