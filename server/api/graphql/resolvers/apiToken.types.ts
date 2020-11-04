/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({ description: 'A type that describes a ApiToken', simpleResolvers: true })
export class ApiToken {
  @Field(() => ID, { nullable: true, defaultValue: null })
  name: string

  @Field({ nullable: true, defaultValue: null })
  timestamp: string
}
