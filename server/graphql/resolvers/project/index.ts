import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { ProjectService } from '../../../services/mongo'
import MSGraphService from '../../../services/msgraph'
import { IAuthOptions } from '../../authChecker'
import {
  CreateOrUpdateProjectResult,
  Project,
  ProjectInput,
  ProjectOptions
} from '../types'

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
   * @param _project - Project service
   * @param _msgraph - Microsoft Graph service
   */
  constructor(
    private readonly _project: ProjectService,
    private readonly _msgraph: MSGraphService
  ) {}

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
    const { projects } = await this._project.getProjectsData(
      customerKey && { customerKey }
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
      const success = await this._project.updateProject(p)
      return { success }
    } else {
      const id = await this._project.addProject(p)
      if (options.createOutlookCategory) {
        await this._msgraph.createOutlookCategory(id)
      }
      return { success: true, id }
    }
  }
}

export * from './types'
