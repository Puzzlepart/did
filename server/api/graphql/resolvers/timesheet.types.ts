/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'
import { EventError, Project } from '../types'
import { Customer } from './customer.types'
import { LabelObject } from './label.types'

@ObjectType({ description: 'A type that describes a Event' })
export class EventObject {
  @Field()
  id: string

  @Field()
  key: string

  @Field()
  day: string

  @Field()
  title: string

  @Field()
  body: string

  @Field()
  isOrganizer: boolean

  @Field()
  startDateTime: string

  @Field()
  endDateTime: string

  @Field()
  date: string

  @Field()
  duration: number

  @Field(() => Project, { nullable: true })
  project: Project

  @Field(() => Project, { nullable: true })
  suggestedProject: Project

  @Field(() => Customer, { nullable: true })
  customer: Customer

  @Field()
  projectKey: string

  @Field()
  customerKey: string

  @Field()
  webLink: string

  @Field(() => [LabelObject], { nullable: true })
  labels: LabelObject[]

  @Field(() => EventError, { nullable: true })
  error: EventError

  @Field({ nullable: true })
  manualMatch?: boolean

  @Field({ nullable: true })
  isSystemIgnored?: boolean
}

@InputType({ description: 'Input object for Event used in Mutation submitPeriod' })
export class EventInput {
  @Field()
  id: string

  @Field()
  projectId: string

  @Field()
  manualMatch: boolean
}

@ObjectType({ description: 'A type that describes a TimesheetPeriod' })
export class TimesheetPeriodObject {
  @Field()
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

  @Field()
  isForecasted: boolean

  @Field()
  isForecast: boolean

  @Field()
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

  @Field()
  forecastedHours: number
}

@InputType()
export class TimesheetQuery {
  @Field()
  startDateTime: string

  @Field()
  endDateTime: string
}