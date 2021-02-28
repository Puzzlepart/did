/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import {Arg, Authorized, Ctx, Query, Resolver} from 'type-graphql';
import {Service} from 'typedi';
import {MongoService} from '../../../services/mongo';
import {IAuthOptions} from '../../authChecker';
import {Context} from '../../context';
import {ReportsQuery, TimeEntry} from './types';

/**
 * @category Resolver
 */
@Service()
@Resolver(TimeEntry)
export class ReportsResolver {
	/**
	 * Constructor for ReportsResolver
	 *
	 * @param _mongo - Mongo service
	 */
	constructor(private readonly _mongo: MongoService) {}

	/**
	 * Get time entries
	 *
	 * @param query - Query
	 * @param currentUser - Current user
	 * @param sortAsc - Sort ascending
	 * @param ctx - GraphQL context
	 */
	@Authorized<IAuthOptions>()
	@Query(() => [TimeEntry], {
		description: 'Get time entries matching the provided query'
	})
	async timeentries(
	@Arg('query') query: ReportsQuery,
		@Arg('currentUser', {nullable: true}) currentUser: boolean,
		@Arg('sortAsc', {nullable: true}) sortAsc: boolean,
		@Ctx() ctx: Context
	) {
		if (currentUser) {
			query.userId = ctx.userId;
		}

		return this._mongo.reports.getReport(query, sortAsc);
	}
}

export * from './types';
