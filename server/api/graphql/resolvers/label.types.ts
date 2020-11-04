/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { ObjectType, InputType, Field, ID } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({ description: 'A type that describes a LabelObject', simpleResolvers: simpleResolvers.LabelObject })
export class LabelObject {
  @Field(() => ID)
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
