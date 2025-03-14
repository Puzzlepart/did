/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql'
import { Customer, Project, ProjectRole, User } from '../types'

/**
 * Represents a TimeEntry object with all its properties and relationships.
 * All fields are required except for the role field.
 *
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

  @Field(() => ProjectRole, { nullable: true })
  role: ProjectRole

  @Field({ nullable: true })
  manualMatch?: boolean
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
   * ID of the project to filter on.
   */
  @Field({ nullable: true })
  projectId?: string

  /**
   * IDs of the users to filter on.
   */
  @Field(() => [String], { nullable: true })
  userIds?: string[]

  /**
   * Start date to filter on.
   */
  @Field({ nullable: true })
  startDateTime?: Date

  /**
   * End date to filter on.
   */
  @Field({ nullable: true })
  endDateTime?: Date

  /**
   * Week to filter on.
   */
  @Field({ nullable: true })
  week?: number

  /**
   * Month to filter on.
   */
  @Field({ nullable: true })
  month?: number

  /**
   * Year to filter on.
   */
  @Field({ nullable: true })
  year?: number
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
