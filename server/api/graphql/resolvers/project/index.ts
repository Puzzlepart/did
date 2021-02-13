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
  projects(
    @Arg('customerKey', { nullable: true }) customerKey: string,
    @Arg('sortBy', { nullable: true }) sortBy: string
  ): Promise<Project[]> {
    return this._mongo.project.getProjects()
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
    return await Promise.resolve({ success: true, error: null })
    // try {
    //   const id = await this._azstorage.createOrUpdateProject(project, ctx.userId, update)
    //   if (options.createOutlookCategory) {
    //     await this._msgraph.createOutlookCategory(id)
    //   }
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
  }
}

export * from './types'
