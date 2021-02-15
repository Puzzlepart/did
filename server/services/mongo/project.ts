import * as Mongo from 'mongodb'
import { CustomerMongoService } from '.'
import { Customer, LabelObject as Label, Project } from '../../graphql/resolvers/types'
import { filter, find } from 'underscore'
import { MongoDocumentService } from './document'
import { LabelMongoService } from './label'

export type ProjectsData = {
  projects: Project[],
  customers: Customer[],
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
   * Get projects, customers and labels
   * 
   * Connects labels and customer to projects
   *
   * @param {Mongo.FilterQuery<Project>} query Query
   */
  public async getProjectsData(query?: Mongo.FilterQuery<Project>): Promise<ProjectsData> {
    try {
      const [
        projects,
        customers,
        labels
      ] = await Promise.all([
        this.find(query),
        this._customer.getCustomers(query?.customerKey && { key: query.customerKey }),
        this._label.getLabels()
      ])
      const _projects = projects
        .map((p) => {
          p.customer = find(customers, (c) => c.key === p.customerKey) || null
          p.labels = filter(labels, ({ name }) => {
            return !!find(p.labels, l => name === l)
          })
          return p
        })
        .filter((p) => p.customer !== null)
      return { projects: _projects, customers, labels }
    } catch (err) {
      throw err
    }
  }
}
