/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { ReportLinkService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { ReportLink, ReportLinkInput, ReportLinkQuery } from './types'

/**
 * Resolver for `ReportLink`.
 *
 * `ReportLinkService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(ReportLink)
export class ReportLinkResolver {
  /**
   * Constructor for ReportLinkResolver
   *
   * @param _reportLink - Label service
   */
  constructor(private readonly _reportLink: ReportLinkService) {}

  /**
   * Get report links using the specified query.
   */
  @Authorized()
  @Query(() => [ReportLink], {
    description: 'Get report links using the specified query'
  })
  reportLinks(
    @Arg('query', () => ReportLinkQuery, { nullable: true })
    query: ReportLinkQuery
  ): Promise<ReportLink[]> {
    return this._reportLink.getReportLinks(query)
  }

  /**
   * Add or update report link. The `update` flag determines if the
   * report link is added or updated. Permission scope `MANAGE_REPORT_LINKS`
   * is required.
   *
   * @param reportLink - Report link
   * @param update - Update flag
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_REPORT_LINKS })
  @Mutation(() => BaseResult, { description: 'Add or update report link' })
  async addOrUpdateReportLink(
    @Arg('reportLink', () => ReportLinkInput) reportLink: ReportLinkInput,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<BaseResult> {
    const r = new ReportLink(reportLink)
    await (update
      ? this._reportLink.updateReportLink(r)
      : this._reportLink.addReportLink(r))
    return { success: true, error: null }
  }

  /**
   * Delete report link by name. Permission scope `MANAGE_REPORT_LINKS` is
   * required.
   *
   * @param name - Name
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_REPORT_LINKS })
  @Mutation(() => BaseResult, { description: 'Delete report link by name' })
  async deleteReportLink(@Arg('name') name: string): Promise<BaseResult> {
    await this._reportLink.deleteReportLink(name)
    return { success: true, error: null }
  }
}

export * from './types'
