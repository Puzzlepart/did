/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'
import DateUtils from '../../../../../shared/utils/date'
import { EventObject } from './EventObject'

/**
 * @category ObjectType
 */
@ObjectType({
  description: 'A type that describes a TimesheetPeriod',
  simpleResolvers: true
})
export class TimesheetPeriodObject {
  /**
   * Temp ID field.
   */
  public id: string

  /**
   * Primary ID field.
   *
   * Used as primary key (id) in CosmosDB
   */
  @Field(() => ID, { description: 'Primary ID field.' })
  public _id: string

  /**
   * The full GUID of the user
   */
  @Field({ description: 'The full GUID of the user', nullable: true })
  public userId: string

  /**
   * The week number.
   */
  @Field({ description: 'The week number.' })
  public week: number

  /**
   * Month name
   */
  @Field({ description: 'Month name' })
  public month: string

  /**
   * Year. Quite obvius.
   */
  @Field({ description: 'Year. Quite obvius.' })
  public year: number

  /**
   * Start date
   */
  @Field({ description: 'Start date.' })
  public startDate: string

  /**
   * End date
   */
  @Field({ description: 'End date.' })
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
  public hours: number

  @Field({ nullable: true })
  public forecastedHours?: number

  /**
   * Constructs a new instance of TimesheetPeriodObject
   *
   * @param startDate - Start date
   * @param endDate - End date
   * @param locale - User locale
   */
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
