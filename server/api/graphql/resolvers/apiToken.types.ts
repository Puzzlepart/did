/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({ description: 'A type that describes a ApiToken', simpleResolvers: simpleResolvers.ApiToken })
export class ApiToken {
  @Field(() => ID, { nullable: true, defaultValue: null })
  name: string

  @Field()
  created: Date
}