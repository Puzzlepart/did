import { FilterQuery } from 'mongodb'
import { filter, find, pick } from 'underscore'
import { CustomerService } from '.'
import { Context } from '../../graphql/context'
import {
  Customer,
  LabelObject as Label,
  Project
} from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'
import { LabelService } from './label'

export type ProjectsData = {
  projects: Project[]
  customers: Customer[]
  labels: Label[]
}

export class ProjectService extends MongoDocumentService<Project> {
  private _customer: CustomerService
  private _label: LabelService

  /**
   * Constructor for MongoDatabase
   *
   * @param context - Context
   */
  constructor(context: Context) {
    super(context, 'projects', ProjectService.name)
    this._customer = new CustomerService(context)
    this._label = new LabelService(context)
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
      await this.cache.clear({ key: 'getprojectsdata' })
      const tag = [project.customerKey, project.key].join(' ')
      const { insertedId } = await this.collection.insertOne({
        _id: tag,
        tag,
        ...project
      })
      return insertedId
    } catch (error) {
      throw error
    }
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
      await this.cache.clear({ key: 'getprojectsdata' })
      const filter: FilterQuery<Project> = pick(project, 'key', 'customerKey')
      const { result } = await this.collection.updateOne(filter, {
        $set: project
      })
      return result.ok === 1
    } catch (error) {
      throw error
    }
  }

  /**
   * Get projects, customers and labels.
   *
   * Projects are sorted by the name property
   *
   * Connects labels and customer to projects
   *
   * @param query - Query
   */
  public getProjectsData(query?: FilterQuery<Project>): Promise<ProjectsData> {
    try {
      return this.cache.usingCache<ProjectsData>(
        async () => {
          const [projects, customers, labels] = await Promise.all([
            this.find(query, { name: 1 }),
            this._customer.getCustomers(
              query?.customerKey && { key: query.customerKey }
            ),
            this._label.getLabels()
          ])
          const _projects = projects
            .map((p) => {
              p.customer =
                find(customers, (c) => c.key === p.customerKey) || null
              p.labels = filter(labels, ({ name }) => {
                return !!find(p.labels, (l) => name === l)
              })
              return p
            })
            .filter((p) => p.customer !== null)
          const data = { projects: _projects, customers, labels }
          return data
        },
        { key: ['getprojectsdata', query?.customerKey.toString()] }
      )
    } catch (error) {
      throw error
    }
  }
}
