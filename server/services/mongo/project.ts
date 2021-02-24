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
   * Returns the ID of the added project
   *
   * @param {Project} project Project to add
   */
  public async addProject(project: Project): Promise<string> {
    try {
      await this._cache.clear('getprojectsdata')
      const tag = [project.customerKey, project.key].join(' ')
      const { insertedId } = await this.collection.insertOne({
        _id: tag,
        tag,
        ...project
      })
      return insertedId
    } catch (err) {
      throw err
    }
  }

  /**
   * Update project
   * 
   * Returns true if the operation was successful
   *
   * @param {Project} project Project to update
   */
  public async updateProject(project: Project): Promise<boolean> {
    try {
      await this._cache.clear('getprojectsdata')
      const filter: FilterQuery<Project> = pick(project, 'key', 'customerKey')
      const { result } = await this.collection.updateOne(filter, { $set: project })
      return result.ok === 1
    } catch (err) {
      throw err
    }
  }

  /**
   * Get projects, customers and labels. 
   * 
   * Projects are sorted by the name property
   *
   * Connects labels and customer to projects
   *
   * @param {FilterQuery<Project>} query Query
   */
  public async getProjectsData(query?: FilterQuery<Project>): Promise<ProjectsData> {
    try {
      let cacheKey = 'getprojectsdata'
      if (query?.customerKey) cacheKey += `/${query.customerKey}`
      const cacheValue = await this._cache.get<ProjectsData>(cacheKey)
      if (cacheValue) return cacheValue
      const [projects, customers, labels] = await Promise.all([
        this.find(query, { name: 1 }),
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
      await this._cache.set(cacheKey, data, 120)
      return data
    } catch (err) {
      throw err
    }
  }
}

