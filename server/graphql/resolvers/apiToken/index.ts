/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from './types'

@Service()
@Resolver(ApiToken)
export class ApiTokenResolver {
  /**
   * Constructor for ApiTokenResolver
   *
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get API tokens
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  apiTokens(): Promise<ApiToken[]> {
    return this._mongo.apiToken.getTokens()
  }

  /**
   * Add API token
   *
   * @param {ApiTokenInput} token Token
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => String, { description: 'Add API token' })
  addApiToken(@Arg('token') token: ApiTokenInput): Promise<string> {
    return this._mongo.apiToken.addToken(token)
  }

  /**
   * Delete API token
   *
   * @param {string} name Name
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(@Arg('name') name: string): Promise<BaseResult> {
    await this._mongo.apiToken.deleteToken(name)
    return { success: true, error: null }
  }
}

export * from './types'
