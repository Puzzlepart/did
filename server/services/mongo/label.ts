import {
  DeleteWriteOpResultObject,
  FilterQuery,
  InsertOneWriteOpResult,
  WithId
} from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RequestContext } from '../../graphql/requestContext'
import { LabelObject as Label } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

/**
 * Label service
 *
 * @extends MongoDocumentService
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class LabelService extends MongoDocumentService<Label> {
  /**
   * Constructor for `LabelService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'labels', LabelService.name)
  }

  /**
   * Generate an ID for a label
   *
   * @param label - Label
   */
  private _generateId(label: Label) {
    return label.name.replace(/[^\da-z]/gi, '').toLowerCase()
  }

  /**
   * Get labels from cache or database.
   *
   * @param query - Query
   */
  public getLabels(query?: FilterQuery<Label>): Promise<Label[]> {
    try {
      return this.cache.usingCache<Label[]>(
        async () => {
          const labels = await this.find(query)
          return labels
        },
        { key: 'labels' }
      )
    } catch (error) {
      throw error
    }
  }

  /**
   * Add label, then clear the cache key `labels`.
   *
   * @param label - Label
   */
  public async addLabel(
    label: Label
  ): Promise<InsertOneWriteOpResult<WithId<Label>>> {
    try {
      const result = await this.insert({
        _id: this._generateId(label),
        ...label
      })
      await this.cache.clear({ key: 'labels' })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Update label, then clear the cache key `labels`.
   *
   * @param label - Label
   */
  public async updateLabel(label: Label): Promise<void> {
    try {
      await this.update(_.pick(label, 'name'), label)
      await this.cache.clear({ key: 'labels' })
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete label by name, then clear the cache key `labels`.
   *
   * @param name - Name
   */
  public async deleteLabel(name: string): Promise<DeleteWriteOpResultObject> {
    try {
      const result = await this.collection.deleteOne({ name })
      await this.cache.clear({ key: 'labels' })
      return result
    } catch (error) {
      throw error
    }
  }
}
