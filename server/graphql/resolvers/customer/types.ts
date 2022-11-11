/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a Customer',
  simpleResolvers: true
})
export class Customer {
  @Field(() => ID)
  key: string

  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field({ nullable: true, defaultValue: null })
  webLink: string

  @Field({ nullable: true, defaultValue: null })
  externalSystemURL: string

  @Field({ nullable: true, defaultValue: null })
  icon: string

  @Field({ nullable: true, defaultValue: false })
  inactive?: boolean

  /**
   * Creates a Customer object from a CustomerInput object
   *
   * @param input - Input object
   */
  public fromInput(input: CustomerInput): Customer {
    Object.assign(this, input)
    return this
  }
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for Customer used in Mutation createOrUpdateCustomer'
})
export class CustomerInput {
  @Field()
  key: string

  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field({ nullable: true, defaultValue: null })
  webLink?: string

  @Field({ nullable: true, defaultValue: null })
  externalSystemURL?: string

  @Field()
  icon: string

  @Field({ nullable: true, defaultValue: false })
  inactive?: boolean
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
