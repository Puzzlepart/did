import {useLayoutEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import {useTimesheetReducer} from '../reducer';
import {ITimesheetContext, ITimesheetParams} from '../types';
import {useSubmitActions} from './useSubmitActions';
import {useTimesheetQuery} from './useTimesheetQuery';

/**
 * Hook for Timesheet
 *
 * * Get history using useHistory
 * * Get URL params using useParams
 * * Using reducer from /reducer
 * * Using useTimesheetQuery with timesheet.gql
 * * Layout effects for initialiing state and updating state
 *   when the query is reloaded
 * * Returns TimesheetContextProvider with Timesheet context
 */
export function useTimesheet() {
	const {t} = useTranslation();
	const history = useHistory();
	const url = useParams<ITimesheetParams>();
	const {state, dispatch} = useTimesheetReducer({url, t});

	const {refetch} = useTimesheetQuery(state, dispatch);

	useLayoutEffect(() => {
		if (!state.selectedPeriod) {
			return;
		}

		history.push(
			['/timesheet', state.selectedView, state.selectedPeriod.path].join('/')
		);
	}, [state.selectedView, state.selectedPeriod]);

	const {onSubmitPeriod, onUnsubmitPeriod} = useSubmitActions({
		state,
		dispatch,
		refetch
	});

	const context = useMemo<ITimesheetContext>(
		() => ({
			...state,
			refetch,
			onSubmitPeriod,
			onUnsubmitPeriod,
			dispatch,
			t
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);
	return {
		state,
		dispatch,
		context,
		onSubmitPeriod,
		onUnsubmitPeriod,
		t
	};
}
