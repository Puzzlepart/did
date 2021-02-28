import {AppContext} from 'AppContext';
import {useContext, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import {IProjectsContext} from '../context';
import {useProjectsReducer} from '../reducer';
import {IProjectsParams} from '../types';
import {useHistoryUpdater} from './useHistoryUpdater';
import {useProjectList} from './useProjectList';
import {useProjectsQuery} from './useProjectsQuery';

/**
 * Hook for Projects
 *
 * * Get history using useHistory
 * * Get URL params using useParams
 * * Using reducer from ../reducer
 * * Using useProjectsQuery with projects.gql
 * * Layout effects for initialiing state and updating state
 *   when the query is reloaded
 * * Returns ProjectsContextProvider with Projects context
 */
export function useProjects() {
	const {t} = useTranslation();
	const {user} = useContext(AppContext);
	const history = useHistory();
	const url = useParams<IProjectsParams>();
	const {state, dispatch} = useProjectsReducer({url, history});
	const {refetch, loading} = useProjectsQuery(dispatch);

	useHistoryUpdater(state);

	const context = useMemo<IProjectsContext>(
		() => ({
			state,
			dispatch,
			refetch
		}),
		[state, dispatch, refetch]
	);

	const {listProps} = useProjectList({state, dispatch, loading, t});

	return {
		state,
		dispatch,
		listProps,
		user,
		t,
		context
	};
}
