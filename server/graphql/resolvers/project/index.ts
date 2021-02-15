/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult, Project, ProjectInput, ProjectOptions } from '../types'
import { MongoService } from '../../../services/mongo'

@Service()
@Resolver(Project)
export class ProjectResolver {
  /**
   * Constructor for ProjectResolver
   *
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) { }

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
    // TODO: Avoid using as any. project.addProject takes Project as param while project in this context is of type ProjectInput
    // TODO: Handle creating of Outlook category (createOutlookCategory)
    await this._mongo.project.addProject(project as any)
    return { success: true, error: null }
  }
}

export * from './types'
