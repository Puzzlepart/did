import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { CustomerService } from '..'
import { RequestContext } from '../../../graphql/requestContext'
import { Customer, Project } from '../../../graphql/resolvers/types'
import { MongoDocumentService } from '../document'
import { LabelService } from '../label'
import {
  DefaultGetProjectsDataOptions,
  GetProjectsDataOptions,
  ProjectResourcesExtension,
  ProjectRoleDefinitionsExtension,
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
    this.registerExtension(new ProjectResourcesExtension())
    this.registerExtension(new ProjectRoleDefinitionsExtension())
    this.registerExtension(new ProjectRoleDefinitionsExtension())
  }

  /**
   * Adds a new project to the database.
   *
   * @param project - The project object to be added.
   * @returns A promise that resolves to the ID of the inserted project.
   *
   * @remarks
   * This method clears the cache for 'getprojectsdata' before adding the new project.
   * The project's key and customer key are converted to uppercase and used as the `_id` in the database.
   */
  public async addProject(project: Project): Promise<string> {
    const customerKey = project.customerKey.toUpperCase()
    const key = project.key.toUpperCase()
    const tag = `${customerKey} ${key}`

    await this.cache.clear('getprojectsdata')

    const { insertedId } = await this.insert({
      _id: tag,
      ...project,
      customerKey,
      key,
      tag
    })

    return insertedId
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
      await this.cache.clear()
      const filter: FilterQuery<Project> = _.pick(project, 'key', 'customerKey')
      const { result } = await this.update(filter, project)
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
    options: GetProjectsDataOptions = {}
  ): Promise<ProjectsData> {
    try {
      const mergedOptions = { ...DefaultGetProjectsDataOptions, ...options }
      return this.cache.usingCache<ProjectsData>(
        async () => {
          const [projects, customers, labels] = await Promise.all([
            this.find(query, { name: 1 }),
            mergedOptions.includeCustomers
              ? (this._customerSvc.getCustomers(
                  query?.customerKey && { key: query.customerKey }
                ) as Promise<Customer[]>)
              : Promise.resolve([]),
            mergedOptions.includeLabels
              ? this._labelSvc.getLabels()
              : Promise.resolve([])
          ])
          const _projects = projects
            .map<Project>((project) => ({
              ...project,
              customer:
                _.find(customers, (c) => c.key === project.customerKey) || null,
              labels: _.filter(labels, (l) =>
                _.contains(project.labels, l.name)
              ),
              parent: projects.find(({ tag }) => tag === project.parentKey),
              children: projects.filter(
                ({ parentKey }) => parentKey === project.tag
              )
            }))
            .filter(
              (p) => p.customer !== null || !mergedOptions.includeCustomers
            )
          const data = { projects: _projects, customers, labels }
          return data
        },
        {
          key: ['getprojectsdata', query],
          hash: 'sha256',
          disabled: !mergedOptions.cache
        }
      )
    } catch (error) {
      throw error
    }
  }
}
