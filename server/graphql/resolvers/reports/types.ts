/* eslint-disable tsdoc/syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql'
import { Customer, Project, User } from '../types'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a TimeEntry',
  simpleResolvers: true
})
export class TimeEntry {
  @Field(() => ID)
  id: string

  @Field()
  key: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  startDateTime: Date

  @Field()
  endDateTime: Date

  @Field()
  webLink: string

  @Field(() => Float)
  duration: number

  @Field()
  projectId: string

  @Field()
  userId: string

  @Field()
  week: number

  @Field()
  month: number

  @Field()
  year: number

  @Field()
  webUrl: string

  @Field(() => Project)
  project: Project

  @Field(() => Customer)
  customer: Customer

  @Field(() => User)
  resource: User
}

/**
 * Reports query preset
 *
 * @category GraphQL Type
 */
export type ReportsQueryPreset =
  | 'LAST_MONTH'
  | 'CURRENT_MONTH'
  | 'LAST_YEAR'
  | 'CURRENT_YEAR'
  | 'FORECAST'

/**
 * @category GraphQL InputType
 */
@InputType()
export class ReportsQuery {
  /**
   * ID of the project to filter on
   */
  @Field({ nullable: true })
  projectId?: string
}

/**
 * @category GraphQL InputType
 */
@InputType()
export class ConfirmedPeriodsQuery {
  @Field({ nullable: true })
  week?: number

  @Field({ nullable: true })
  year?: number
}
