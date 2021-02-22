/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import MSGraphService from '../../../services/msgraph'
import { IAuthOptions } from '../../authChecker'
import { BaseResult, Project, ProjectInput, ProjectOptions } from '../types'

@Service()
@Resolver(Project)
export class ProjectResolver {
  /**
   * Constructor for ProjectResolver
   *
   * @param {MongoService} _mongo Mongo service
   * @param {MSGraphService} _msgraph MSGraphService
   */
  constructor(private readonly _mongo: MongoService, private readonly _msgraph: MSGraphService) {}

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
    const data = await this._mongo.project.getProjectsData(customerKey && { customerKey })
    return data.projects
  }

  /**
   * Create or update project
   *
   * @param {ProjectInput} project Project
   * @param {ProjectOptions} options Options
   * @param {boolean} update Update
   */
  @Authorized<IAuthOptions>({ permission: 'ef4032fb' })
  @Mutation(() => BaseResult, { description: 'Create or update project' })
  async createOrUpdateProject(
    @Arg('project', () => ProjectInput) project: ProjectInput,
    @Arg('options', () => ProjectOptions) options: ProjectOptions,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<BaseResult> {
    const p = new Project().fromInput(project)
    if (options.createOutlookCategory) {
      await this._msgraph.createOutlookCategory(p.tag)
    }
    if (update) await this._mongo.project.updateProject(p)
    else await this._mongo.project.addProject(p)
    return { success: true, error: null }
  }
}

export * from './types'
