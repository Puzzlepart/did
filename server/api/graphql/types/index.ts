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

export * from '../resolvers/apiToken.types'
export * from '../resolvers/customer.types'
export * from '../resolvers/label.types'
export * from '../resolvers/notification.types'
export * from '../resolvers/timeentry.types'
export * from '../resolvers/timesheet.types'
export * from '../resolvers/project.types'
export * from '../resolvers/outlookCategory.types'
export * from '../resolvers/user.types'
export * from '../resolvers/role.types'
