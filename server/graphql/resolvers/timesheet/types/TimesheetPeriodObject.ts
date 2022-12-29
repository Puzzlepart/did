import 'reflect-metadata'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import $date from '../../../../../shared/utils/date'
import { EventObject } from './EventObject'
import { HolidayObject } from './HolidayObject'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a TimesheetPeriod',
  simpleResolvers: true
})
export class TimesheetPeriodObject {
  /**
   * Temp ID field.
   *
   * @remarks Needs to be queryable by GraphQL for now.
   */
  @Field({ nullable: true })
  public id: string

  /**
   * Primary ID field which is used as primary key (id) in CosmosDB
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

  @Field(() => [HolidayObject], { nullable: true })
  public holidays?: HolidayObject[]

  @Field(() => Float, { nullable: true })
  public timebank?: number

  /**
   * Constructs a new instance of TimesheetPeriodObject
   *
   * @param startDate - Start date
   * @param endDate - End date
   * @param locale - User locale
   */
  constructor(startDate: string, endDate: string, locale: string) {
    this.id = $date.getPeriod(startDate)
    this.startDate = startDate
    this.endDate = endDate
    this.week = $date.getWeek(startDate)
    this.month = $date.formatDate(startDate, 'MMMM', locale)
    this.isForecast = $date.isAfterToday(startDate)
    this.isForecasted = false
    this.isConfirmed = false
  }
}
