/* eslint-disable unicorn/no-array-callback-reference */
import {Collection, FilterQuery} from 'mongodb';
import {Context} from '../../graphql/context';
import {CacheService} from '../cache';

export class MongoDocumentService<T> {
	public cache: CacheService = null;
	public collection: Collection<T>;

	/**
	 * Constructs a new Mongo Document Service
	 *
	 * Specify cachePrefix to use an underlying CacheService
	 *
	 * @param context - Context
	 * @param collectionName - Colletion name
	 * @param cachePrefix - Cache prefix
	 */
	constructor(
		public readonly context: Context,
		public collectionName: string,
		public cachePrefix?: string
	) {
		this.collection = context.db.collection(collectionName);
		if (cachePrefix) {
			this.cache = new CacheService(this.context, cachePrefix);
		}
	}

	/**
	 * Wrapper on find().toArray()
	 *
	 * @see — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
	 *
	 * @param query - Query
	 * @param sort - Sort options
	 */
	public async find<S = any>(query: FilterQuery<T>, sort?: S) {
		return this.collection.find(query, {sort}).toArray();
	}
}
