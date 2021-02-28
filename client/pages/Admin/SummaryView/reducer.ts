import {IContextualMenuItem} from 'office-ui-fabric-react';
import {ISummaryViewRange, ISummaryViewScope, ISummaryViewState} from './types';

export type SummaryViewAction =
	| {type: 'DATA_UPDATED'; payload: {timeentries: any[]}}
	| {type: 'CHANGE_TYPE'; payload: IContextualMenuItem}
	| {type: 'CHANGE_SCOPE'; payload: ISummaryViewScope}
	| {type: 'SET_RANGE'; payload: ISummaryViewRange};

export const reducer = (
	state: ISummaryViewState,
	action: SummaryViewAction
): ISummaryViewState => {
	const newState: ISummaryViewState = {...state};
	switch (action.type) {
		case 'DATA_UPDATED':
			{
				if (action.payload) {
					newState.timeentries = action.payload.timeentries;
				}
			}

			break;

		case 'CHANGE_TYPE':
			{
				newState.type = action.payload;
			}

			break;

		case 'SET_RANGE':
			{
				newState.range = {...newState.range, ...action.payload};
			}

			break;

		case 'CHANGE_SCOPE':
			{
				newState.scope = action.payload;
			}

			break;

		default:
			throw new Error();
	}

	return newState;
};
