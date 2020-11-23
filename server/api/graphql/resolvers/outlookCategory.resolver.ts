/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { MSGraphService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { CreateOutlookCategoryResult, OutlookCategory } from './outlookCategory.types'

@Service()
@Resolver(OutlookCategory)
export class OutlookCategoryResolver {
  /**
   * Constructor for OutlookCategoryResolver
   *
   * MSGraphService is automatically injected using Container from typedi
   *
   * @param {MSGraphService} _msgraph MSGraphService
   */
  constructor(private readonly _msgraph: MSGraphService) { }

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
   * @param {string} category Category
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => CreateOutlookCategoryResult, { description: 'Create Outlook category' })
  async createOutlookCategory(@Arg('category') category: string) {
    try {
      const data = await this._msgraph.createOutlookCategory(category)
      return { data, success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
