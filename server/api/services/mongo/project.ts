import * as Mongo from 'mongodb'
import { CustomerMongoService } from './'
import { Project } from '../../graphql/resolvers/types'
import { find } from 'underscore'

export class ProjectMongoService {
  private _collectionName = 'projects'
  private _collection: Mongo.Collection<Project>
  private _customer: CustomerMongoService
  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
    this._customer = new CustomerMongoService(db)
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
        this._collection.find(query).toArray(),
        this._customer.getCustomers()
      ])
      projects = projects
        .map(p => {
          p.customer = find(customers, c => c.key === p.customerKey) || null
          // TODO: Set labels using LabelMongoServide
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
