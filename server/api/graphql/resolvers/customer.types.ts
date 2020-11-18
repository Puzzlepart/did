/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { ObjectType, InputType, Field, ID } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({
  description: 'A type that describes a Customer',
  simpleResolvers: simpleResolvers.Customer
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
}

@InputType({ description: 'Input object for Customer used in Mutation createOrUpdateCustomer' })
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
 */
export interface ICustomersQueryVariables {
  sortBy: string
}

/**
 * Variables for mutation createOrUpdateCustomer
 */
export interface ICreateOrUpdateCustomerVariables {
  customer: Customer
  update: boolean
}

/**
 * Variables for mutation createOrUpdateCustomer
 */
export interface IDeleteCustomerVariables {
  key: string
}
