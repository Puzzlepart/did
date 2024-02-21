/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
/**
 * A type that describes an API token.
 */
@ObjectType({
  description: 'A type that describes an API token',
  simpleResolvers: true
})
export class ApiToken {
  /**
   * The name of the API token.
   */
  @Field(() => ID, { nullable: true, defaultValue: null })
  name: string

  /**
   * The description of the API token.
   */
  @Field(() => String, { nullable: true, defaultValue: null })
  description: string

  /**
   * The date when the API token was created.
   */
  @Field()
  created?: Date

  /**
   * The date when the API token expires.
   */
  @Field()
  expires: Date

  /**
   * An array of permissions associated with the API token.
   */
  @Field(() => [String], { nullable: true })
  permissions: string[]

  /**
   * The secret API key associated with the API token.
   */
  @Field(() => String, { nullable: true })
  apiKey?: string

  /**
   * The subscription ID associated with the API token.
   */
  subscriptionId?: string
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for ApiToken used in mutation addApiToken'
})
export class ApiTokenInput {
  /**
   * The name of the API token.
   */
  @Field(() => ID)
  name: string

  /**
   * The description of the API token input (optional)
   */
  @Field(() => String, { nullable: true, defaultValue: null })
  description: string

  /**
   * The date when the API token expires.
   */
  @Field()
  expires: Date

  /**
   * An array of permissions associated with the API token.
   */
  @Field(() => [String])
  permissions: string[]
}
