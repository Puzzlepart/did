/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'
import { Customer, EventError, LabelObject, Project } from './types'

@ObjectType({ description: 'A type that describes a Event', simpleResolvers: simpleResolvers.EventObject })
export class EventObject {
  @Field(() => ID)
  id: string

  @Field()
  key: string

  @Field()
  day: string

  @Field()
  title: string

  @Field({ nullable: true })
  body: string

  @Field({ nullable: true })
  isOrganizer: boolean

  @Field()
  startDateTime: string

  @Field()
  endDateTime: string

  @Field({ nullable: true })
  date: string

  @Field(() => Float)
  duration: number

  @Field(() => Project, { nullable: true })
  project: Project

  @Field(() => Project, { nullable: true })
  suggestedProject: Project

  @Field(() => Customer, { nullable: true })
  customer: Customer

  @Field({ nullable: true })
  projectKey: string

  @Field({ nullable: true })
  customerKey: string

  @Field({ nullable: true })
  webLink: string

  @Field(() => [LabelObject], { nullable: true })
  labels: LabelObject[]

  @Field(() => EventError, { nullable: true })
  error: EventError

  @Field({ nullable: true })
  manualMatch?: boolean

  @Field({ nullable: true })
  isSystemIgnored?: boolean

  categories?: string[]
}

@InputType({ description: 'Input object for Event used in Mutation submitPeriod' })
export class EventInput {
  @Field()
  id: string

  @Field()
  projectId: string

  @Field({ nullable: true })
  manualMatch: boolean
}

@ObjectType({
  description: 'A type that describes a TimesheetPeriod',
  simpleResolvers: simpleResolvers.TimesheetPeriodObject
})
export class TimesheetPeriodObject {
  @Field(() => ID)
  id: string

  @Field()
  week: number

  @Field()
  month: string

  @Field()
  startDateTime: string

  @Field()
  endDateTime: string

  @Field()
  isConfirmed: boolean

  @Field(() => [EventObject])
  events: EventObject[]

  @Field({ nullable: true })
  isForecasted: boolean

  @Field({ nullable: true })
  isForecast: boolean

  @Field({ nullable: true })
  forecastedHours: number
}

@InputType({ description: 'Input object for TimesheetPeriod used in Mutation unsubmitPeriod' })
export class TimesheetPeriodInput {
  @Field()
  id: string

  @Field()
  startDateTime: string

  @Field()
  endDateTime: string

  @Field(() => [EventInput])
  matchedEvents: EventInput[]

  @Field({ nullable: true })
  forecastedHours: number
}

@InputType()
export class TimesheetQuery {
  @Field()
  startDateTime: string

  @Field()
  endDateTime: string
}
