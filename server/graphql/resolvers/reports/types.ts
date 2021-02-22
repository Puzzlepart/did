/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../../config'
import { Customer, Project, User } from '../types'

@ObjectType({
  description: 'A type that describes a TimeEntry',
  simpleResolvers: simpleResolvers.TimeEntry
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

@InputType()
export class TimeEntriesQuery {
  @Field({ nullable: true })
  periodId?: string

  @Field({ nullable: true })
  startDateTime?: string

  @Field({ nullable: true })
  endDateTime?: string

  @Field({ nullable: true })
  projectId?: string

  @Field({ nullable: true })
  resourceId?: string

  @Field({ nullable: true })
  weekNumber?: number

  @Field({ nullable: true })
  monthNumber?: number

  @Field({ nullable: true })
  startMonthIndex?: number

  @Field({ nullable: true })
  endMonthIndex?: number

  @Field({ nullable: true })
  year?: number
}
