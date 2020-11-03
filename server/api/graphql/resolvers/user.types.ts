/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Role } from './role.types'
import { Subscription } from './subscription.types'

@ObjectType({ description: 'A type that describes a User' })
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
