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
  error: Error
}

@ObjectType({ description: 'A type that describes a EventError' })
export class EventError {
  @Field()
  code: string
}

export * from './apiToken.types'
export * from './customer.types'
export * from './label.types'
export * from './notification.types'
export * from './timeentry.types'
export * from './timesheet.types'
export * from './project.types'
export * from './outlookCategory.types'
export * from './user.types'
export * from './role.types'
