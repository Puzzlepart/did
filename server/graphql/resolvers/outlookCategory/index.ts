/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MSGraphService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { CreateOutlookCategoryResult, OutlookCategory } from './types'

/**
 * Resolver for `OutlookCategory`.
 *
 * `MSGraphService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(OutlookCategory)
export class OutlookCategoryResolver {
  /**
   * Constructor for OutlookCategoryResolver
   *
   * @param _msgraph - Microsoft Graph service
   */
  constructor(private readonly _msgraph: MSGraphService) {}

  /**
   * Get Outlook categories
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [OutlookCategory], { description: 'Get Outlook categories' })
  async outlookCategories() {
    const categories = await this._msgraph.getOutlookCategories()
    return categories.map((c) => ({ ...c, key: c.id }))
  }

  /**
   * Create Outlook category
   *
   * @param category - Category
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => CreateOutlookCategoryResult, {
    description: 'Create Outlook category'
  })
  async createOutlookCategory(
    @Arg('category') category: string
  ): Promise<CreateOutlookCategoryResult> {
    const data = await this._msgraph.createOutlookCategory(category)
    return { success: true, data, error: null }
  }
}

export * from './types'
