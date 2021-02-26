import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'
import DateUtils from '../../../../../shared/utils/date'
import { EventObject } from './EventObject'

@ObjectType({
  description: 'A type that describes a TimesheetPeriod',
  simpleResolvers: true
})
export class TimesheetPeriodObject {
  @Field(() => ID)
  public id: string

  @Field()
  public week: number

  @Field()
  public month: string

  @Field()
  public startDate: string

  @Field()
  public endDate: string

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
