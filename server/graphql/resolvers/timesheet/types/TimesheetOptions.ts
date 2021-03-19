/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'

/**
 * @category GraphQL InputType
 */
@InputType()
export class TimesheetOptions {
  @Field({ nullable: true })
  locale: string

  @Field({ nullable: true })
  dateFormat: string

  @Field({ nullable: true })
  tzOffset: number

  @Field({ nullable: true })
  forecast?: boolean
}
