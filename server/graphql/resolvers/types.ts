/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ObjectType } from 'type-graphql'

/**
 * Ignore from typedoc documentation
 *
 * @ignore
 */
@ObjectType({ description: 'A type that describes a Error' })
export class Error {
  @Field()
  name: string

  @Field()
  message: string

  @Field({ nullable: true })
  code?: string

  @Field({ nullable: true })
  statusCode?: string
}

/**
 * Ignore from typedoc documentation
 *
 * @ignore
 */
@ObjectType({ description: 'A type that describes a BaseResult' })
export class BaseResult {
  @Field({ nullable: true, defaultValue: false })
  success: boolean

  @Field(() => Error, { nullable: true })
  error?: Error
}

/**
 * Ignore from typedoc documentation
 *
 * @ignore
 */
@ObjectType({ description: 'A type that describes a EventError' })
export class EventError {
  @Field()
  code: string
}

export * from './apiToken/types'
export * from './customer/types'
export * from './label/types'
export * from './notification/types'
export * from './outlookCategory/types'
export * from './project/types'
export * from './reportLink/types'
export * from './reports/types'
export * from './role/types'
export * from './subscription/types'
export * from './timesheet/types'
export * from './user/types'
