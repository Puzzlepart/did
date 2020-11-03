/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'A type that describes a ApiToken' })
export class ApiToken {
  @Field({ nullable: true, defaultValue: null })
  name: string

  @Field({ nullable: true, defaultValue: null })
  timestamp: string
}
