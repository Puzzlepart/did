/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Customer, LabelObject as Label, OutlookCategory } from '../types'

@InputType({ description: 'Input object for Project used in Mutation createOrUpdateProject' })
export class ProjectInput {
  @Field()
  key: string

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

@ObjectType({
  description: 'A type that describes a Project',
  simpleResolvers: true
})
export class Project {
  @Field(() => ID)
  public _id: string

  @Field()
  public tag?: string

  @Field()
  public key: string

  @Field()
  public customerKey: string

  @Field()
  public name: string

  @Field({ nullable: true, defaultValue: '' })
  public description: string

  @Field({ nullable: true, defaultValue: null })
  public icon: string

  @Field({ nullable: true, defaultValue: null })
  public webLink?: string

  @Field({ nullable: true, defaultValue: null })
  public externalSystemURL?: string

  @Field(() => Customer)
  public customer?: Customer

  @Field(() => OutlookCategory, { nullable: true, defaultValue: null })
  public outlookCategory?: OutlookCategory

  @Field({ nullable: true, defaultValue: false })
  public inactive?: boolean

  @Field(() => [Label])
  public labels?: Label[] | string[]

  /**
   * Constructs a new Project
   *
   * @param {ProjectInput} input Input
   */
  constructor(input?: ProjectInput) {
    Object.assign(this, input || {})
  }
}

@InputType({
  description: 'Input object for ProjectOptions used in Mutation createOrUpdateProject'
})
export class ProjectOptions {
  @Field({ nullable: true, defaultValue: false })
  createOutlookCategory?: boolean
}

@ObjectType({ description: 'A type that describes a CreateOrUpdateProjectResult' })
export class CreateOrUpdateProjectResult {
  @Field({ nullable: true })
  success: boolean

  @Field({ nullable: true })
  id?: string
}
