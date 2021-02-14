import * as Mongo from 'mongodb'
import { CustomerMongoService } from '.'
import { Project } from '../../graphql/resolvers/types'
import { find } from 'underscore'
import { MongoDocumentService } from './document'

export class ProjectMongoService extends MongoDocumentService<Project> {
  private _customer: CustomerMongoService

  constructor(db: Mongo.Db) {
    super(db, 'projects')
    this._customer = new CustomerMongoService(db)
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
   * Get projects
   *
   * @param {Mongo.FilterQuery<Project>} query Query
   */
  public async getProjects(query?: Mongo.FilterQuery<Project>): Promise<Project[]> {
    try {
      const [projects, customers] = await Promise.all([
        this.find(query),
        this._customer.getCustomers()
      ])
      return projects
        .map((p) => {
          p.customer = find(customers, (c) => c.key === p.customerKey) || null
          // TODO: Set labels using LabelMongoService
          p.labels = []
          return p
        })
        .filter((p) => p.customer !== null)
    } catch (err) {
      throw err
    }
  }
}
