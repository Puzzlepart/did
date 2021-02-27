import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'

@InputType()
export class TimesheetQuery {
  @Field()
  startDate: string

  @Field()
  endDate: string
}
