/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import DateUtils, { DateWithTimezone } from '../../../../../shared/utils/date'
import { stripHtmlString } from '../../../../utils/stripHtmlString'
import { Customer, EventError, LabelObject, Project } from '../../types'

/**
 * An Object type that describes a Event
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'An Object type that describes a Event',
  simpleResolvers: true
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

  @Field({ nullable: true })
  projectId?: string

  @Field(() => Project, { nullable: true })
  project?: Project

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

  /**
   * Constructs a new EventObject
   *
   * @param id - ID
   * @param title - Title
   * @param body - Body
   * @param isOrganizer - Is organizer
   * @param start - Start date with timezone
   * @param end - End date with timezone
   * @param webLink - Web link
   * @param categories - Categories
   */
  constructor(
    id: string,
    title: string,
    body: string,
    isOrganizer: boolean,
    start: DateWithTimezone,
    end: DateWithTimezone,
    webLink: string,
    categories: string[] = []
  ) {
    this.id = id
    this.title = title
    this.body = stripHtmlString(body)
    this.isOrganizer = isOrganizer
    this.startDateTime = DateUtils.parseDateWithTimezone(start)
    this.endDateTime = DateUtils.parseDateWithTimezone(end)
    this.webLink = webLink
    this.categories = categories
    this.duration = DateUtils.getDurationHours(start.dateTime, end.dateTime)
  }
}
