import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import MSGraphService from '../../../services/msgraph'
import { IAuthOptions } from '../../authChecker'
import { CreateOrUpdateProjectResult, Project, ProjectInput, ProjectOptions } from '../types'

@Service()
@Resolver(Project)
export class ProjectResolver {
  /**
   * Constructor for ProjectResolver
   *
   * @param {MongoService} _mongo Mongo service
   * @param {MSGraphService} _msgraph MSGraphService
   */
  constructor(private readonly _mongo: MongoService, private readonly _msgraph: MSGraphService) { }

  /**
   * Get projects
   *
   * @param {string} customerKey Customer key
   */
  @Authorized<IAuthOptions>()
  @Query(() => [Project], { description: 'Get projects' })
  async projects(@Arg('customerKey', { nullable: true }) customerKey: string): Promise<Project[]> {
    const { projects } = await this._mongo.project.getProjectsData(customerKey && { customerKey })
    return projects
  }

  /**
   * Create or update project
   *
   * @param {ProjectInput} project Project
   * @param {ProjectOptions} options Options
   * @param {boolean} update Update
   */
  @Authorized<IAuthOptions>({ permission: 'ef4032fb' })
  @Mutation(() => CreateOrUpdateProjectResult, { description: 'Create or update project' })
  async createOrUpdateProject(
    @Arg('project', () => ProjectInput) project: ProjectInput,
    @Arg('options', () => ProjectOptions) options: ProjectOptions,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<CreateOrUpdateProjectResult> {
    const p = new Project(project)
    if (update) {
      const success = await this._mongo.project.updateProject(p)
      return { success }
    }
    else {
      const id = await this._mongo.project.addProject(p)
      if (options.createOutlookCategory) {
        await this._msgraph.createOutlookCategory(id)
      }
      return { success: true, id }
    }
  }
}

export * from './types'
