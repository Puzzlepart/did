import {
  DeleteWriteOpResultObject,
  FilterQuery,
  InsertOneWriteOpResult,
  WithId
} from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RequestContext } from '../../graphql/requestContext'
import { ReportLink } from '../../graphql/resolvers/reportLink'
import { MongoDocumentService } from './@document'

/**
 * Report links service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ReportLinkService extends MongoDocumentService<ReportLink> {
  /**
   * Constructor for `ReportLinkService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') public readonly context: RequestContext) {
    super(context, 'report_links')
  }

  /**
   * Generate id for a report link
   *
   * @param reportLink - Label
   */
  private _generateId(reportLink: ReportLink) {
    return reportLink.name.replace(/[^\da-z]/gi, '').toLowerCase()
  }

  /**
   * Get report links using the specified query.
   *
   * @param query - Query
   */
  public async getReportLinks(
    query?: FilterQuery<ReportLink>
  ): Promise<ReportLink[]> {
    try {
      const reportLinks = await this.find(query)
      return reportLinks
    } catch (error) {
      throw error
    }
  }

  /**
   * Add report link
   *
   * @param reportLink - Report link
   */
  public async addReportLink(
    reportLink: ReportLink
  ): Promise<InsertOneWriteOpResult<WithId<ReportLink>>> {
    try {
      const result = await this.insert({
        _id: this._generateId(reportLink),
        ...reportLink,
        createdBy: this.context.user.displayName
      })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Update report link
   *
   * @param reportLink - Report link
   */
  public async updateReportLink(reportLink: ReportLink): Promise<void> {
    try {
      await this.update(_.pick(reportLink, 'name'), {
        ...reportLink,
        updatedBy: this.context.user.displayName
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete report link by name
   *
   * @param name - Name
   */
  public async deleteReportLink(
    name: string
  ): Promise<DeleteWriteOpResultObject> {
    try {
      const result = await this.collection.deleteOne({ name })
      return result
    } catch (error) {
      throw error
    }
  }
}
