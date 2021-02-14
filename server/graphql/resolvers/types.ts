/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { ObjectType, Field } from 'type-graphql'

@ObjectType({ description: 'A type that describes a Error' })
export class Error {
  @Field()
  name: string

  @Field()
  message: string

  @Field()
  code: string

  @Field()
  statusCode: string
}

@ObjectType({ description: 'A type that describes a BaseResult' })
export class BaseResult {
  @Field({ nullable: true, defaultValue: false })
  success: boolean

  @Field(() => Error, { nullable: true })
  error?: Error
}

@ObjectType({ description: 'A type that describes a EventError' })
export class EventError {
  @Field()
  code: string
}

export * from './apiToken'
export * from './customer'
export * from './label'
export * from './notification'
export * from './timeentry'
export * from './timesheet'
export * from './project'
export * from './outlookCategory'
export * from './user'
export * from './role'
export * from './subscription'
