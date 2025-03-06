import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { MSGraphService, ProjectService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import {
  BaseResult,
  CreateOrUpdateProjectResult,
  Project,
  ProjectInput,
  ProjectOptions
} from '../types'
import _ from 'lodash'

/**
 * Resolver for `Project`.
 *
 * `ProjectService` and `MSGraphService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */

@Service()
@Resolver(Project)
export class ProjectResolver {
  /**
   * Constructor for ProjectResolver
   *
   * @param _projectSvc - Project service
   * @param _msgraphSvc - Microsoft Graph service
   */
  constructor(
    private readonly _projectSvc: ProjectService,
    private readonly _msgraphSvc: MSGraphService
  ) {
    // Empty constructor. Probably this will be empty
    // until they release the new Elder Scrolls game.
    // I'm really looking forward to that.
  }

  /**
   * Get projects
   *
   * @param customerKey - Customer key
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.ACCESS_PROJECTS })
  @Query(() => [Project], { description: 'Get projects' })
  async projects(
    @Arg('customerKey', { nullable: true }) customerKey: string
  ): Promise<Project[]> {
    const { projects } = await this._projectSvc.getProjectsData(
      customerKey && { customerKey }
    )
    return projects
  }

  /**
   * Get projects where the current user is a member. It needs to check
   * the extension with the ID `2dfbce96-947f-4c26-95b4-5eda10616074`.
   *
   * @param context - GraphQL request context
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.ACCESS_PROJECTS })
  @Query(() => [Project], { description: 'Get projects' })
  async myProjects(@Ctx() context: RequestContext): Promise<Project[]> {
    const extensionId = '2dfbce96-947f-4c26-95b4-5eda10616074'
    const { projects } = await this._projectSvc.getProjectsData(
      {
        $or: [
          {
            [`extensions.${extensionId}.properties.resources.id`]:
              context.userId
          },
          {
            [`extensions.${extensionId}.properties.projectOwner`]:
              context.userId
          }
        ]
      },
      {
        includeLabels: false,
        includeCustomers: false,
        cache: false
      }
    )
    return projects
  }

  /**
   * Create or update project. Permission scope `MANAGE_PROJECTS` is required.
   *
   * @param project - Project
   * @param options - Options
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_PROJECTS })
  @Mutation(() => CreateOrUpdateProjectResult, {
    description: 'Create or update project'
  })
  async createOrUpdateProject(
    @Arg('project', () => ProjectInput) project: ProjectInput,
    @Arg('options', () => ProjectOptions) options: ProjectOptions,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<CreateOrUpdateProjectResult> {
    const p = new Project(project)
    if (update) {
      const success = await this._projectSvc.updateProject(p)
      return { success }
    } else {
      const projectId = await this._projectSvc.addProject(p)
      if (options.createOutlookCategory) {
        await this._msgraphSvc.createOutlookCategory(projectId)
      }
      return { success: true, id: projectId }
    }
  }

  /**
   * Delete project. Permission scope `DELETE_PROJECTS` is required.
   *
   * @param projectId - Project ID
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.DELETE_PROJECTS })
  @Mutation(() => BaseResult, { description: 'Delete project by ID' })
  public async deleteProject(
    @Arg('projectId') projectId: string
  ): Promise<BaseResult> {
    try {
      const success = await this._projectSvc.deleteProject(projectId)
      return { success, error: null }
    } catch (error) {
      return {
        success: false,
        error: _.pick(error, ['name', 'message', 'code', 'statusCode'])
      }
    }
  }
}
