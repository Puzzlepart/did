import 'reflect-metadata'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import { Customer, EventError, LabelObject, Project } from '../../types'

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
