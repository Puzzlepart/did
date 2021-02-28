global.fetch = require('node-fetch');
import {Client as MSGraphClient} from '@microsoft/microsoft-graph-client';
import 'reflect-metadata';
import {Inject, Service} from 'typedi';
import {sortBy} from 'underscore';
import date from '../../../shared/utils/date';
import {Context} from '../../graphql/context';
import env from '../../utils/env';
import {CacheScope, CacheService} from '../cache';
import OAuthService, {AccessTokenOptions} from '../oauth';
import MSGraphEvent, {
	MSGraphEventOptions,
	MSGraphOutlookCategory
} from './types';

@Service({global: false})
class MSGraphService {
	private get _cache() {
		return null;
	}

	private readonly _accessTokenOptions: AccessTokenOptions = {
		clientId: env('OAUTH_APP_ID'),
		clientSecret: env('OAUTH_APP_PASSWORD'),
		tokenHost: 'https://login.microsoftonline.com/common/',
		authorizePath: 'oauth2/v2.0/authorize',
		tokenPath: 'oauth2/v2.0/token'
	};

	constructor(
		private readonly _oauthService: OAuthService,
		private _access_token?: string,
		@Inject('CONTEXT') readonly context?: Context
	) {
		this._cache = new CacheService(context, MSGraphService.name);
	}

	/**
	 * Gets a Microsoft Graph Client using the auth token from the class
	 */
	private async _getClient(): Promise<MSGraphClient> {
		this._access_token = (
			await this._oauthService.getAccessToken(this._accessTokenOptions)
		).access_token;
		const client = MSGraphClient.init({
			authProvider: (done: (arg0: any, arg1: any) => void) => {
				done(null, this._access_token);
			}
		});
		return client;
	}

	/**
	 * Get Azure Active Directory users
	 */
	public async getUsers(): Promise<any> {
		try {
			return await this._cache.usingCache(
				async () => {
					const client = await this._getClient();
					const {value} = await client
						.api('/users')
						// eslint-disable-next-line quotes
						.filter('userType eq \'Member\'')
						.select([
							'id',
							'givenName',
							'surname',
							'jobTitle',
							'displayName',
							'mobilePhone',
							'mail',
							'preferredLanguage'
						])
						.top(999)
						.get();
					const users = sortBy(value, 'displayName');
					return users;
				},
				{key: 'getusers'}
			);
		} catch (error) {
			throw new Error(`MSGraphService.getUsers: ${error.message}`);
		}
	}

	/**
	 * Create Outlook category
	 *
	 * @param category - Category
	 */
	public async createOutlookCategory(
		category: string
	): Promise<MSGraphOutlookCategory> {
		try {
			const colorIdx =
				category
					.split('')
					.map(c => c.charCodeAt(0))
					.reduce((a, b) => a + b) % 24;
			const content = JSON.stringify({
				displayName: category,
				color: `preset${colorIdx}`
			});
			const client = await this._getClient();
			const result = await client
				.api('/me/outlook/masterCategories')
				.post(content);
			return result;
		} catch (error) {
			throw new Error(`MSGraphService.createOutlookCategory: ${error.message}`);
		}
	}

	/**
	 * Get Outlook categories
	 */
	public async getOutlookCategories(): Promise<any[]> {
		try {
			return await this._cache.usingCache(
				async () => {
					const client = await this._getClient();
					const {value} = await client.api('/me/outlook/masterCategories').get();
					return value;
				},
				{key: 'getoutlookcategories', expiry: 1800, scope: CacheScope.USER}
			);
		} catch (error) {
			throw new Error(`MSGraphService.getOutlookCategories: ${error.message}`);
		}
	}

	/**
	 * Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView
	 *
	 * @param startDate - Start date (YYYY-MM-DD)
	 * @param endDate - End date (YYYY-MM-DD)
	 * @param options - Options
	 */
	public async getEvents(
		startDate: string,
		endDate: string,
		options: MSGraphEventOptions
	): Promise<MSGraphEvent[]> {
		try {
			const cacheOptions = {
				key: ['events', startDate, endDate],
				scope: CacheScope.USER
			};
			const events = await this._cache.usingCache(async () => {
				const query = {
					startDateTime: date.toISOString(
						`${startDate}:00:00:00.000`,
						options.tzOffset
					),
					endDateTime: date.toISOString(
						`${endDate}:23:59:59.999`,
						options.tzOffset
					)
				};
				const client = await this._getClient();
				const {value} = (await client
					.api('/me/calendar/calendarView')
					.query(query)
					.select([
						'id',
						'subject',
						'body',
						'start',
						'end',
						'categories',
						'webLink',
						'isOrganizer'
					])
					.filter(
						// eslint-disable-next-line quotes
						'sensitivity ne \'private\' and isallday eq false and iscancelled eq false'
					)
					.orderby('start/dateTime asc')
					.top(500)
					.get()) as {value: any[]};
				return value.filter(event => Boolean(event.subject));
			}, cacheOptions);
			return events
				.map(event => new MSGraphEvent(event, options))
				.filter((event: MSGraphEvent) => event.duration <= 24);
		} catch (error) {
			throw new Error(`MSGraphService.getEvents: ${error.message}`);
		}
	}
}

export default MSGraphService;
