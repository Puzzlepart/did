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
  constructor(private readonly _msgraph: MSGraphService) {
    // empty
  }

  /**
   * Get Outlook categories
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => [OutlookCategory], { description: 'Get Outlook categories' })
  async outlookCategories() {
    const categories = await this._msgraph.getOutlookCategories()
    return categories.map((c) => ({ ...c, key: c.id }))
  }

  /**
   * Create Outlook category with the given name `category`.
   *
   * @param category - Category
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => CreateOutlookCategoryResult, {
    description: 'Create Outlook category'
  })
  async createOutlookCategory(
    @Arg('category') category: string,
    @Arg('colorPresetIndex', { nullable: true }) colorPresetIndex?: number
  ): Promise<CreateOutlookCategoryResult> {
    try {
      const data = await this._msgraph.createOutlookCategory(
        category,
        colorPresetIndex
      )
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: { name: error.name, message: error.message }
      }
    }
  }
}
