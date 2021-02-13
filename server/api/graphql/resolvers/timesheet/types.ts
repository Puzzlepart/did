/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql'
import DateUtils from '../../../../../shared/utils/date'
import { simpleResolvers } from '../../config'
import { Customer, EventError, LabelObject, Project } from '../types'

@ObjectType({
  description: 'A type that describes a Event',
  simpleResolvers: simpleResolvers.EventObject
})
export class EventObject {
  @Field(() => ID)
  id: string

  @Field()
  day?: string

  @Field()
  title?: string

  @Field({ nullable: true })
  body?: string

  @Field({ nullable: true })
  isOrganizer?: boolean

  @Field()
  startDateTime?: Date

  @Field()
  endDateTime?: Date

  @Field()
  date?: string

  @Field(() => Float)
  duration?: number

  @Field(() => Project, { nullable: true })
  project: Project

  @Field(() => Project, { nullable: true })
  suggestedProject?: Project

  @Field(() => Customer, { nullable: true })
  customer?: Customer

  @Field({ nullable: true })
  projectKey?: string

  @Field({ nullable: true })
  customerKey?: string

  @Field({ nullable: true })
  webLink?: string

  @Field(() => [LabelObject], { nullable: true })
  labels?: LabelObject[]

  @Field(() => EventError, { nullable: true })
  error?: EventError

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
  public id: string

  @Field()
  public week: number

  @Field()
  public month: string

  @Field(() => Date)
  public startDate: Date | string

  @Field(() => Date)
  public endDate: Date | string

  @Field(() => [EventObject])
  public events?: EventObject[]

  @Field({ nullable: true })
  public isConfirmed: boolean = false

  @Field({ nullable: true })
  public isForecasted: boolean = false

  @Field({ nullable: true })
  public isForecast: boolean

  @Field({ nullable: true })
  public forecastedHours?: number

  constructor(startDate: string, endDate: string, locale: string) {
    this.id = DateUtils.getPeriod(startDate)
    this.startDate = startDate
    this.endDate = endDate
    this.week = DateUtils.getWeek(startDate)
    this.month = DateUtils.formatDate(startDate, 'MMMM', locale)
    this.isForecast = DateUtils.isAfterToday(startDate)
    this.isForecasted = false
    this.isConfirmed = false
  }
}

@InputType({ description: 'Input object for TimesheetPeriod used in Mutation unsubmitPeriod' })
export class TimesheetPeriodInput {
  @Field()
  id: string

  @Field()
  startDate: string

  @Field()
  endDate: string

  @Field(() => [EventInput])
  matchedEvents: EventInput[]

  @Field({ nullable: true })
  forecastedHours: number
}

@InputType()
export class TimesheetQuery {
  @Field()
  startDate: string

  @Field()
  endDate: string
}

@InputType()
export class TimesheetOptions {
  @Field({ nullable: true })
  locale?: string

  @Field({ nullable: true })
  dateFormat?: string

  @Field({ nullable: true })
  tzOffset?: number

  @Field({ nullable: true })
  forecast?: boolean
}
