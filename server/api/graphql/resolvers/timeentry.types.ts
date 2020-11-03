/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, InputType, ObjectType } from 'type-graphql'
import { Project, User } from '../types'
import { Customer } from './customer.types'

@ObjectType({ description: 'A type that describes a TimeEntry' })
export class TimeEntry {
  @Field()
  id: string

  @Field()
  key: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  startDateTime: string

  @Field()
  endDateTime: string

  @Field()
  webLink: string

  @Field(() => Float)
  duration: number

  @Field()
  projectId: string

  @Field()
  weekNumber: number

  @Field()
  monthNumber: number

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
  startDateTime: string

  @Field({ nullable: true })
  endDateTime: string

  @Field({ nullable: true })
  projectId: string

  @Field({ nullable: true })
  resourceId: string

  @Field({ nullable: true })
  weekNumber: number

  @Field({ nullable: true })
  monthNumber: number

  @Field({ nullable: true })
  startMonthIndex: number

  @Field({ nullable: true })
  endMonthIndex: number

  @Field({ nullable: true })
  year: number
}
