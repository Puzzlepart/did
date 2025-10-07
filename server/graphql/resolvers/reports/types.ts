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

  @Field(() => Customer, { nullable: true })
  partner: Customer

  @Field(() => User)
  resource: User

  @Field(() => ProjectRole, { nullable: true })
  role: ProjectRole

  @Field({ nullable: true })
  manualMatch?: boolean
}

/**
 * Paginated report result including metadata for client-side navigation.
 */
@ObjectType({ description: 'Paginated report page result' })
export class ReportPageResult {
  @Field(() => [TimeEntry])
  entries: TimeEntry[]

  @Field({ description: 'True when additional pages exist after this one' })
  hasMore: boolean

  @Field({ nullable: true, description: 'Total matching entries (may be approximate for very large queries)' })
  totalCount?: number

  @Field({ nullable: true })
  limit?: number

  @Field({ nullable: true })
  skip?: number

  @Field({ nullable: true })
  preset?: string
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

  /**
   * Maximum number of results to return (for pagination)
   */
  @Field({ nullable: true })
  limit?: number

  /**
   * Number of results to skip (for pagination)
   */
  @Field({ nullable: true })
  skip?: number
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
