import * as Mongo from 'mongodb'
import { filter, find, pick } from 'underscore'
import { CustomerMongoService } from '.'
import { Customer, LabelObject as Label, Project } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'
import { LabelMongoService } from './label'

export type ProjectsData = {
  projects: Project[]
  customers: Customer[]
  labels: Label[]
}

export class ProjectMongoService extends MongoDocumentService<Project> {
  private _customer: CustomerMongoService
  private _label: LabelMongoService

  constructor(db: Mongo.Db) {
    super(db, 'projects')
    this._customer = new CustomerMongoService(db)
    this._label = new LabelMongoService(db)
  }

  /**
   * Add project
   *
   * @param {Project} project Project to add
   */
  public async addProject(project: Project): Promise<void> {
    try {
      await this.collection.insertOne(project)
    } catch (err) {
      throw err
    }
  }

  /**
   * Update project
   *
   * @param {Project} project Project to update
   */
  public async updateProject(project: Project): Promise<void> {
    try {
      await this.collection.updateOne(pick(project, 'key', 'customerKey'), { $set: project })
    } catch (err) {
      throw err
    }
  }

  /**
   * Get projects, customers and labels
   *
   * Connects labels and customer to projects
   *
   * @param {Mongo.FilterQuery<Project>} query Query
   */
  public async getProjectsData(query?: Mongo.FilterQuery<Project>): Promise<ProjectsData> {
    try {
      const cacheValue = await this.getFromCache<ProjectsData>('projects_data')
      if (cacheValue) return cacheValue
      const [projects, customers, labels] = await Promise.all([
        this.find(query),
        this._customer.getCustomers(query?.customerKey && { key: query.customerKey }),
        this._label.getLabels()
      ])
      const _projects = projects
        .map((p) => {
          p.customer = find(customers, (c) => c.key === p.customerKey) || null
          p.labels = filter(labels, ({ name }) => {
            return !!find(p.labels, (l) => name === l)
          })
          return p
        })
        .filter((p) => p.customer !== null)
      const data = { projects: _projects, customers, labels }
      await this.storeInCache('projects_data', data)
      return data
    } catch (err) {
      throw err
    }
  }
}
