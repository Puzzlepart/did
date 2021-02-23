import { Db as MongoDatabase, FilterQuery } from 'mongodb'
import { filter, find, pick } from 'underscore'
import { CustomerService } from '.'
import { Customer, LabelObject as Label, Project } from '../../graphql/resolvers/types'
import { CacheService } from '../cache'
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
   * @param {MongoDatabase} db Mongo database
   * @param {CacheService} _cache Cache service
   */
  constructor(db: MongoDatabase, private readonly _cache: CacheService) {
    super(db, 'projects')
    this._customer = new CustomerService(db)
    this._label = new LabelService(db)
    this._cache.prefix = ProjectService.name
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
      const filter: FilterQuery<Project> = pick(project, 'key', 'customerKey')
      await this.collection.updateOne(filter, { $set: project })
    } catch (err) {
      throw err
    }
  }

  /**
   * Get projects, customers and labels
   *
   * Connects labels and customer to projects
   *
   * @param {FilterQuery<Project>} query Query
   */
  public async getProjectsData(query?: FilterQuery<Project>): Promise<ProjectsData> {
    try {
      const cacheValue = await this._cache.get<ProjectsData>('getProjectsData')
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
      await this._cache.set('getProjectsData', data, 120)
      return data
    } catch (err) {
      throw err
    }
  }
}

