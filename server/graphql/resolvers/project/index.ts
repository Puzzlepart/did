/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Context } from '../../../graphql/context'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { ProjectService } from '../../../services/mongo'
import { GoogleCalendarService, MSGraphService } from '../../../services'
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
   * @param _googleCalSvc - Google calendar service
   * @param _context - GraphQL context
   */
  constructor(
    private readonly _project: ProjectService,
    private readonly _msgraph: MSGraphService,
    private readonly _googleCalSvc: GoogleCalendarService,
    @Inject('CONTEXT') private readonly _context: Context
    // eslint-disable-next-line unicorn/empty-brace-spaces
  ) { }

  /**
   * Get projects
   *
   * @param customerKey - Customer key
   */
  @Authorized<IAuthOptions>()
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
   * Create or update project
   *
   * @param project - Project
   * @param options - Options
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ permission: 'ef4032fb' })
  @Mutation(() => CreateOrUpdateProjectResult, {
    description: 'Create or update project'
  })
  async createOrUpdateProject(
    @Arg('project', () => ProjectInput) project: ProjectInput,
    @Arg('options', () => ProjectOptions) options: ProjectOptions,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<CreateOrUpdateProjectResult> {
    try {
      const p = new Project(project)
      if (update) {
        const success = await this._project.updateProject(p)
        return { success }
      } else {
        const id = await this._project.addProject(p)
        if (options.createOutlookCategory) {
          switch (this._context.provider) {
            case 'google': {
              const ccal = await this._googleCalSvc.createCalendar({
                summary: p.name,
                description: `${p.description} [${id}]`
              })
              console.log(ccal)
            }
              break
            default: {
              await this._msgraph.createOutlookCategory(id)
            }
          }
          return { success: true, id }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
}

export * from './types'
