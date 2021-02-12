/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from './types'

@Service()
@Resolver(ApiToken)
export class ApiTokenResolver {
  /**
   * Constructor for ApiTokenResolver
   */
  constructor() {}

  /**
   * Get API tokens
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  async apiTokens(@Ctx() ctx: Context): Promise<ApiToken[]> {
    return await Promise.resolve([])
  }

  /**
   * Add API token
   *
   * @param {ApiTokenInput} token Name    *
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => String, { description: 'Add API token' })
  addApiToken(@Arg('token') token: ApiTokenInput, @Ctx() ctx: Context): Promise<string> {
    return Promise.resolve(null)
  }

  /**
   * Delete API token
   *
   * @param {string} name Name
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(@Arg('name') name: string, @Ctx() ctx: Context): Promise<BaseResult> {
    return await Promise.resolve({ success: true, error: null })
  }
}

export * from './types'
