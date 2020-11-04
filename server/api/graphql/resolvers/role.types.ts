/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType({ description: 'A type that describes a Role' })
export class Role {
  @Field()
  name?: string

  @Field()
  icon?: string

  @Field(() => [String])
  permissions?: string[]
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
