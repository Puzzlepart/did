import {TFunction} from 'i18next';
import {IChoiceGroupOption} from 'office-ui-fabric-react';
import {getQueryPresets} from 'pages/Reports/queries';
import {ReportsQuery} from 'types';
import {filter} from 'underscore';

export interface IExportType extends IChoiceGroupOption {
	variables: {
		query: ReportsQuery;
	};
	exportFileName: string;
}

/**
 * Get export types
 *
 * Get queries (getQueries) from pages/Reports, but omits forecast
 *
 * @param t - Translate function
 */
export const getExportTypes = (t: TFunction): IExportType[] => {
	const queries = getQueryPresets<IExportType>(t);
	return filter(queries, ({key}) => key !== 'FORECAST');
};
