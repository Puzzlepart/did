import * as Mongo from 'mongodb'
import { CustomerMongoService } from './'
import { Project } from '../../graphql/resolvers/types'
import { find } from 'underscore'
import { MongoDocumentServiceService } from './document'

export class ProjectMongoService extends MongoDocumentServiceService<Project> {
  private _customer: CustomerMongoService
  
  constructor(db: Mongo.Db) {
    super(db, 'projects')
  }

  /**
   * Get projects
   *
   * @param {Mongo.FilterQuery<Project>} query Query
   */
  public async getProjects(query?: Mongo.FilterQuery<Project>): Promise<Project[]> {
    try {
      // eslint-disable-next-line prefer-const
      let [projects, customers] = await Promise.all([
        this.find(query),
        this._customer.getCustomers()
      ])
      projects = projects
        .map(p => {
          p.customer = find(customers, c => c.key === p.customerKey) || null
          // TODO: Set labels using LabelMongoService
          p.labels = []
          return p
        })
        .filter(p => p.customer !== null)
      return projects
    } catch (err) {
      throw err
    }
  }
}
