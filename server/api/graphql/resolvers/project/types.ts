/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../../config'
import { Customer, LabelObject, OutlookCategory } from '../types'

@ObjectType({
  description: 'A type that describes a Project',
  simpleResolvers: simpleResolvers.Project
})
export class Project {
  @Field(() => ID)
  id?: string

  @Field()
  key: string

  @Field()
  projectKey: string

  @Field()
  customerKey: string

  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field({ nullable: true, defaultValue: null })
  icon: string

  @Field({ nullable: true, defaultValue: null })
  webLink?: string

  @Field({ nullable: true, defaultValue: null })
  externalSystemURL?: string

  @Field(() => Customer)
  customer?: Customer

  @Field(() => OutlookCategory, { nullable: true, defaultValue: null })
  outlookCategory?: OutlookCategory

  @Field({ nullable: true, defaultValue: false })
  inactive?: boolean

  @Field(() => [LabelObject])
  labels?: LabelObject[]
}

@InputType({ description: 'Input object for Project used in Mutation createOrUpdateProject' })
export class ProjectInput {
  @Field()
  projectKey: string

  @Field()
  customerKey: string

  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field()
  icon: string

  @Field({ nullable: true, defaultValue: null })
  webLink?: string

  @Field({ nullable: true, defaultValue: null })
  externalSystemURL?: string

  @Field({ nullable: true })
  inactive?: boolean

  @Field(() => [String], { nullable: true })
  labels?: string[]
}

@InputType({
  description: 'Input object for ProjectOptions used in Mutation createOrUpdateProject'
})
export class ProjectOptions {
  @Field({ nullable: true, defaultValue: false })
  createOutlookCategory?: boolean
}
