import {
	DeleteWriteOpResultObject,
	FilterQuery,
	InsertOneWriteOpResult,
	WithId
} from 'mongodb';
import {pick} from 'underscore';
import {Context} from '../../graphql/context';
import {LabelObject as Label} from '../../graphql/resolvers/types';
import {MongoDocumentService} from './@document';

export class LabelService extends MongoDocumentService<Label> {
	constructor(context: Context) {
		super(context, 'labels');
	}

	/**
	 * Generate id for a label
	 *
	 * @param label - Label
	 */
	private _generateId(label: Label) {
		return label.name.replace(/[^a-z\d]/gi, '').toLowerCase();
	}

	/**
	 * Get labels
	 *
	 * @param query - Query
	 */
	public async getLabels(query?: FilterQuery<Label>): Promise<Label[]> {
		try {
			const labels = await this.find(query);
			return labels;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Add label
	 *
	 * @param label - Label
	 */
	public async addLabel(
		label: Label
	): Promise<InsertOneWriteOpResult<WithId<Label>>> {
		try {
			const result = await this.collection.insertOne({
				_id: this._generateId(label),
				...label
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update label
	 *
	 * @param label - Label
	 */
	public async updateLabel(label: Label): Promise<void> {
		try {
			await this.collection.updateOne(pick(label, 'name'), {$set: label});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete label by name
	 *
	 * @param name - Name
	 */
	public async deleteLabel(name: string): Promise<DeleteWriteOpResultObject> {
		try {
			const result = await this.collection.deleteOne({name});
			return result;
		} catch (error) {
			throw error;
		}
	}
}
