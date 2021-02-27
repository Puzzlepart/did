/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'A type that describes a ApiToken',
  simpleResolvers: true
})
export class ApiToken {
  @Field(() => ID, { nullable: true, defaultValue: null })
  name: string

  @Field()
  created?: Date

  @Field()
  expires: Date

  @Field(() => [String], { nullable: true })
  permissions: string[]

  apiKey?: string
  subscriptionId?: string
}

@InputType({
  description: 'Input object for ApiToken used in mutation addApiToken'
})
export class ApiTokenInput {
  @Field(() => ID)
  name: string

  @Field()
  expires: Date

  @Field(() => [String])
  permissions: string[]
}
