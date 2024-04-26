import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { CustomerService } from '..'
import { RequestContext } from '../../../graphql/requestContext'
import { Customer, Project } from '../../../graphql/resolvers/types'
import { tryParseJson } from '../../../utils'
import { MongoDocumentService } from '../document'
import { LabelService } from '../label'
import {
  GetProjectsDataOptions,
  DefaultGetProjectsDataOptions,
  ProjectsData
} from './types'

/**
 * Project service
 *
 * @extends MongoDocumentService
 *
 * @category Injectable Container Service
 */

@Service({ global: false })
export class ProjectService extends MongoDocumentService<Project> {
  /**
   * Constructor for `ProjectService`
   *
   * @param context - Injected context through `typedi`
   * @param _customerSvc - Injected `CustomerService` through `typedi`
   * @param _labelSvc - Injected `LabelService` through `typedi`
   */
  constructor(
    @Inject('CONTEXT') readonly context: RequestContext,
    private readonly _customerSvc: CustomerService,
    private readonly _labelSvc: LabelService
  ) {
    super(context, 'projects', ProjectService.name)
  }

  /**
   * Add project
   *
   * Returns the ID of the added project
   *
   * @param project - Project to add
   */
  public async addProject(project: Project): Promise<string> {
    try {
      await this.cache.clear('getprojectsdata')
      const tag = [project.customerKey, project.key].join(' ')
      const { insertedId } = await this.insert(
        this._handleProjectProperties(
          {
            _id: tag,
            tag,
            ...project,
            properties: project.properties
              ? JSON.parse(project.properties as string)
              : {}
          },
          'set'
        )
      )
      return insertedId
    } catch (error) {
      throw error
    }
  }

  /**
   * Handles the project properties based on the specified action. This is used
   * to avoid typing the properties field in the GraphQL schema. We want to store
   * the data as JSON in `mongodb`, but we want to return it as a string in the
   * GraphQL schema.
   *
   * - If the action is `get`, it converts the project properties to a JSON string
   * and returns the result.
   * - If the action is `set`, it converts the project properties to an JSON object,
   * and returns the updated project object.
   *
   * @note This might be a good candidate for a decorator, or some sort of dynamic
   * field transformation.
   *
   * @param project - The project object.
   * @param action - The action to perform on the project properties ('get' or 'set').
   *
   * @returns The updated project object.
   */
  protected _handleProjectProperties(
    project: Project,
    action: 'get' | 'set'
  ): Project {
    if (!project.properties) return project
    if (action === 'get') {
      project.properties = project.properties
        ? JSON.stringify(project.properties)
        : '{}'
    } else {
      project.properties = tryParseJson(project.properties as string, {})
    }
    return project
  }

  /**
   * Update project
   *
   * Returns true if the operation was successful
   *
   * @param project - Project to update
   */
  public async updateProject(project: Project): Promise<boolean> {
    try {
      await this.cache.clear('getprojectsdata')
      const filter: FilterQuery<Project> = _.pick(project, 'key', 'customerKey')
      const { result } = await this.update(
        filter,
        this._handleProjectProperties(project, 'set')
      )
      return result.ok === 1
    } catch (error) {
      throw error
    }
  }

  /**
   * Get projects, customers and labels.
   *
   * Projects are sorted by the name property, then connects
   * customers and labels to projects using the `customerKey` and
   * `labels` properties.
   *
   * The `options` parameter can be used to exclude customers and
   * labels in the result. By default, customers and labels are
   * included.
   *
   * @param query - Query for the projects
   * @param options - Options for the query
   */
  public getProjectsData(
    query?: FilterQuery<Project>,
    options: GetProjectsDataOptions = DefaultGetProjectsDataOptions
  ): Promise<ProjectsData> {
    try {
      return this.cache.usingCache<ProjectsData>(
        async () => {
          const [projects, customers, labels] = await Promise.all([
            this.find(query, { name: 1 }),
            options.includeCustomers
              ? (this._customerSvc.getCustomers(
                  query?.customerKey && { key: query.customerKey }
                ) as Promise<Customer[]>)
              : Promise.resolve([]),
            options.includeLabels
              ? this._labelSvc.getLabels()
              : Promise.resolve([])
          ])
          const _projects = projects
            .map((p) =>
              this._handleProjectProperties(
                {
                  ...p,
                  customer:
                    _.find(customers, (c) => c.key === p.customerKey) || null,
                  labels: _.filter(labels, (l) => _.contains(p.labels, l.name))
                },
                'get'
              )
            )
            .filter((p) => p.customer !== null || !options.includeCustomers)
          const data = { projects: _projects, customers, labels }
          return data
        },
        {
          key: { ...query, collection: 'projects' },
          disabled: !options.cache
        }
      )
    } catch (error) {
      throw error
    }
  }
}
