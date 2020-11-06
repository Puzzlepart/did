/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({ description: 'A type that describes a Role', simpleResolvers: simpleResolvers.Role })
export class Role {
  @Field(() => ID)
  name?: string

  @Field()
  icon?: string

  @Field(() => [String])
  permissions?: string[]

  @Field({ nullable: true })
  readOnly: boolean
}

@InputType({ description: 'Input object for Role used in Mutation addOrUpdateRole' })
export class RoleInput {
  @Field()
  name?: string

  @Field()
  icon?: string

  @Field(() => [String])
  permissions?: string[]
}
