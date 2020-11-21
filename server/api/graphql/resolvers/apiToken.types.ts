/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({
  description: 'A type that describes a ApiToken',
  simpleResolvers: simpleResolvers.ApiToken
})
export class ApiToken {
  @Field(() => ID, { nullable: true, defaultValue: null })
  name: string

  @Field()
  created: Date

  @Field()
  expires: string
}

@InputType({ description: 'Input object for ApiToken used in mutation addApiToken' })
export class ApiTokenInput {
  @Field(() => ID)
  name?: string

  @Field()
  expires?: string

  @Field(() => [String])
  permissions?: string[]
}
