import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { AzStorageService, MSGraphService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { connectEntities } from './project.utils'
import { BaseResult, Project, ProjectInput, ProjectOptions } from './types'

@Service()
@Resolver(Project)
export class ProjectResolver {
  /**
   * Constructor for ProjectResolver
   *
   * AzStorageService and MSGraphService is automatically injected using Container from typedi
   *
   * @param {AzStorageService} _azstorage AzStorageService
   * @param {MSGraphService} _msgraph MSGraphService
   */
  constructor(
    private readonly _azstorage: AzStorageService,
    private readonly _msgraph: MSGraphService
  ) {}

  /**
   * Get projects
   *
   * @param {string} customerKey Customer key
   * @param {string} sortBy Sort by
   */
  @Authorized<IAuthOptions>()
  @Query(() => [Project], { description: 'Get projects' })
  async projects(
    @Arg('customerKey', { nullable: true }) customerKey: string,
    @Arg('sortBy', { nullable: true }) sortBy: string
  ): Promise<Project[]> {
    // eslint-disable-next-line prefer-const
    let [projects, customers, labels] = await Promise.all([
      this._azstorage.getProjects(customerKey, { sortBy }),
      this._azstorage.getCustomers(),
      this._azstorage.getLabels()
    ])
    projects = connectEntities(projects, customers, labels)
    return projects
  }

  /**
   * Create or update project
   *
   * @permission MANAGE_PROJECTS (ef4032fb)
   *
   * @param {ProjectInput} project Project
   * @param {boolean} update Update
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ permission: 'ef4032fb' })
  @Mutation(() => BaseResult, { description: 'Create or update project' })
  async createOrUpdateProject(
    @Arg('project', () => ProjectInput) project: ProjectInput,
    @Arg('options', () => ProjectOptions) options: ProjectOptions,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    try {
      const id = await this._azstorage.createOrUpdateProject(project, ctx.userId, update)
      if (options.createOutlookCategory) {
        await this._msgraph.createOutlookCategory(id)
      }
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
