import {IAppContext} from 'AppContext';
import {IReportsParams, IReportsQuery} from '../types';

/**
 * @category Reports
 */
export interface IReportsReducerParameters {
	/**
	 * URL parameters
	 */
	url: IReportsParams;

	/**
	 * Queries
	 */
	queries: IReportsQuery[];

	/**
	 * App context
	 */
	app: IAppContext;
}
