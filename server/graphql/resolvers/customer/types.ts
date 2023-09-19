/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { LabelObject as Label } from '../types'

/**
 * Represents the input object for creating or updating a customer.
 *
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for Customer used in Mutation createOrUpdateCustomer'
})
export class CustomerInput {
  /**
   * The unique key of the customer.
   */
  @Field()
  key: string

  /**
   * The name of the customer.
   */
  @Field()
  name: string

  /**
   * The description of the customer.
   */
  @Field({ nullable: true, defaultValue: '' })
  description: string

  /**
   * The web link of the customer.
   */
  @Field({ nullable: true, defaultValue: null })
  webLink?: string

  /**
   * The external system URL of the customer.
   */
  @Field({ nullable: true, defaultValue: null })
  externalSystemURL?: string

  /**
   * The icon of the customer.
   */
  @Field()
  icon: string

  /**
   * Whether the customer is inactive or not.
   */
  @Field({ nullable: true, defaultValue: false })
  inactive?: boolean

  /**
   * The labels associated with the customer.
   */
  @Field(() => [String], { nullable: true })
  labels?: string[]
}

/**
 * Represents a customer.
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a Customer',
  simpleResolvers: true
})
export class Customer {
  /**
   * The unique ID of the customer.
   */
  @Field(() => ID)
  id: string

  /**
   * The unique key of the customer.
   */
  @Field()
  key: string

  /**
   * The name of the customer.
   */
  @Field()
  name: string

  /**
   * The description of the customer.
   */
  @Field({ nullable: true, defaultValue: '' })
  description: string

  /**
   * The web link of the customer.
   */
  @Field({ nullable: true, defaultValue: null })
  webLink?: string

  /**
   * The external system URL of the customer.
   */
  @Field({ nullable: true, defaultValue: null })
  externalSystemURL?: string

  /**
   * The icon of the customer.
   */
  @Field()
  icon: string

  /**
   * Whether the customer is inactive or not.
   */
  @Field({ nullable: true, defaultValue: false })
  inactive?: boolean

  /**
   * The labels associated with the customer.
   */
  @Field(() => [Label])
  public labels?: Label[] | string[]
}

/**
 * Variables for query customers
 *
 * @ignore
 */
export interface ICustomersQueryVariables {
  sortBy: string
}

/**
 * Variables for mutation createOrUpdateCustomer
 *
 * @ignore
 */
export interface ICreateOrUpdateCustomerVariables {
  customer: Customer
  update: boolean
}

/**
 * Variables for mutation createOrUpdateCustomer
 *
 * @ignore
 */
export interface IDeleteCustomerVariables {
  key: string
}
