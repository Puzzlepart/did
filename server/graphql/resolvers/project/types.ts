/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Customer, LabelObject as Label, OutlookCategory } from '../types'

/**
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for ProjectBudget used in Mutation createOrUpdateProject'
})
/**
 * Represents the input object for creating or updating a project.
 */
export class ProjectBudgetInput {
  /**
   * Enable budget tracking for the project.
   */
  @Field({ nullable: true })
  trackingEnabled?: boolean

  /**
   * The budget for the project in amount of hours.
   */
  @Field({ nullable: true })
  hours?: number

  /**
   * The percentage of the budget at which a warning will be shown.
   */
  @Field({ nullable: true })
  warningThreshold?: number

  /**
   * The percentage of the budget at which an error will be shown.
   */
  @Field({ nullable: true })
  criticalThreshold?: number
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for Project used in Mutation createOrUpdateProject'
})
/**
 * Represents the input object for creating or updating a project.
 */
export class ProjectInput {
  /**
   * The unique key of the project.
   */
  @Field()
  key: string

  /**
   * The unique key of the customer associated with the project.
   */
  @Field()
  customerKey: string

  /**
   * The name of the project.
   */
  @Field()
  name: string

  /**
   * The description of the project.
   */
  @Field({ nullable: true, defaultValue: '' })
  description: string

  /**
   * The icon of the project.
   */
  @Field()
  icon: string

  /**
   * The web link of the project.
   */
  @Field({ nullable: true, defaultValue: null })
  webLink?: string

  /**
   * The external system URL of the project.
   */
  @Field({ nullable: true, defaultValue: null })
  externalSystemURL?: string

  /**
   * Whether the project is inactive or not.
   */
  @Field({ nullable: true })
  inactive?: boolean

  /**
   * The labels associated with the project.
   */
  @Field(() => [String], { nullable: true })
  labels?: string[]

  /**
   * The budget tracking for the project.
   */
  @Field(() => ProjectBudgetInput, { nullable: true })
  budgetTracking?: ProjectBudgetInput
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a ProjectBudget',
  simpleResolvers: true
})
export class ProjectBudget {
  /**
   * Enable budget tracking for the project.
   */
  @Field({ nullable: true })
  trackingEnabled?: boolean

  /**
   * The budget for the project in amount of hours.
   */
  @Field({ nullable: true })
  hours?: number

  /**
   * The percentage of the budget at which a warning will be shown.
   */
  @Field({ nullable: true })
  warningThreshold?: number

  /**
   * The percentage of the budget at which an error will be shown.
   */
  @Field({ nullable: true })
  criticalThreshold?: number
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a Project',
  simpleResolvers: true
})
/**
 * Represents a project.
 */
export class Project {
  /**
   * The unique identifier of the project.
   */
  @Field(() => ID)
  public _id: string

  /**
   * The tag of the project.
   */
  @Field()
  public tag?: string

  /**
   * The key of the project.
   */
  @Field()
  public key: string

  /**
   * The customer key of the project.
   */
  @Field()
  public customerKey: string

  /**
   * The name of the project.
   */
  @Field()
  public name: string

  /**
   * The description of the project.
   */
  @Field({ nullable: true, defaultValue: '' })
  public description: string

  /**
   * The icon of the project.
   */
  @Field({ nullable: true, defaultValue: null })
  public icon: string

  /**
   * The web link of the project.
   */
  @Field({ nullable: true, defaultValue: null })
  public webLink?: string

  /**
   * The external system URL of the project.
   */
  @Field({ nullable: true, defaultValue: null })
  public externalSystemURL?: string

  /**
   * The customer of the project.
   */
  @Field(() => Customer)
  public customer?: Customer

  /**
   * The outlook category of the project.
   */
  @Field(() => OutlookCategory, { nullable: true, defaultValue: null })
  public outlookCategory?: OutlookCategory

  /**
   * Whether the project is inactive or not.
   */
  @Field({ nullable: true, defaultValue: false })
  public inactive?: boolean

  /**
   * The labels of the project.
   */
  @Field(() => [Label], { nullable: true })
  public labels?: Label[] | string[]

  /**
   * The budget tracking for the project.
   */
  @Field(() => ProjectBudget, { nullable: true })
  public budgetTracking?: ProjectBudget

  /**
   * Constructs a new Project.
   *
   * @param input - The input to construct the project from.
   */
  constructor(input?: ProjectInput) {
    Object.assign(this, input || {})
  }
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for ProjectOptions used in Mutation createOrUpdateProject'
})
export class ProjectOptions {
  @Field({ nullable: true, defaultValue: false })
  createOutlookCategory?: boolean
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a CreateOrUpdateProjectResult'
})
export class CreateOrUpdateProjectResult {
  @Field({ nullable: true })
  success: boolean

  @Field({ nullable: true })
  id?: string
}
