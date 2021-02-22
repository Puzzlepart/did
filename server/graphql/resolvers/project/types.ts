/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Customer, LabelObject as Label, OutlookCategory } from '../types'

@ObjectType({
  description: 'A type that describes a Project',
  simpleResolvers: true
})
export class Project {
  @Field(() => ID)
  public key: string

  @Field()
  public customerKey: string

  @Field()
  public get tag(): string {
    return `${this.customerKey} ${this.key}`
  }

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
   * @param {any} data Data
   */
  constructor(data?: any) {
    Object.assign(this, data || {})
  }

  /**
   * Creates a Project object from a ProjectInput object
   *
   * @param {ProjectInput} input Input object
   */
  public fromInput(input: ProjectInput): Project {
    Object.assign(this, input)
    return this
  }
}

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

@InputType({
  description: 'Input object for ProjectOptions used in Mutation createOrUpdateProject'
})
export class ProjectOptions {
  @Field({ nullable: true, defaultValue: false })
  createOutlookCategory?: boolean
}
