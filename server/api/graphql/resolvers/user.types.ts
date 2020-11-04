/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'
import { Role } from './types'

@ObjectType({ description: 'A type that describes a Subscription', simpleResolvers: simpleResolvers.Subscription })
export class Subscription {
  @Field()
  id: string

  @Field()
  name: string

  /**
   * Connection string for the subscription storage
   */
  connectionString?: string
}

@ObjectType({ description: 'A type that describes a User', simpleResolvers: simpleResolvers.User })
export class User {
  @Field(() => ID)
  id?: string

  @Field()
  displayName?: string

  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  surname?: string

  @Field({ nullable: true })
  jobTitle?: string

  @Field({ nullable: true })
  mobilePhone?: string

  @Field({ nullable: true })
  mail?: string

  @Field({ nullable: true })
  preferredLanguage?: string

  @Field(() => Role)
  role?: Role

  @Field(() => Subscription)
  subscription?: Subscription
}

@InputType({ description: 'Input object for Role used in Mutation addOrUpdateUser/bulkAddUsers' })
export class UserInput implements Partial<User> {
  @Field()
  id?: string

  @Field()
  displayName?: string

  @Field()
  givenName?: string

  @Field()
  surname?: string

  @Field({ nullable: true })
  jobTitle?: string

  @Field({ nullable: true })
  mobilePhone?: string

  @Field({ nullable: true })
  mail?: string

  @Field({ nullable: true })
  preferredLanguage?: string
}
