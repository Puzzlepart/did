/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'
import { Subscription } from './subscription.types'
import { Role } from './types'

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

  public create?(user: User): User {
    Object.assign(this, user)
    return this
  }
}

@InputType({ description: 'Input object for Role used in Mutation addOrUpdateUser/bulkImport' })
export class UserInput {
  @Field()
  id?: string

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  role?: string
}
