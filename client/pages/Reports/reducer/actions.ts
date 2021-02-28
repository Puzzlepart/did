import {QueryResult} from '@apollo/client';
import {createAction} from '@reduxjs/toolkit';
import {IFilter} from 'components/FilterPanel';
import {IListGroups} from 'components/List/types';
import {IContextualMenuItem} from 'office-ui-fabric-react';
import {IReportsSavedFilter} from '../types';

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const INIT = createAction('INIT');

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const TOGGLE_FILTER_PANEL = createAction('TOGGLE_FILTER_PANEL');

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const DATA_UPDATED = createAction<{query: QueryResult}>('DATA_UPDATED');

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const FILTERS_UPDATED = createAction<{filters: IFilter[]}>(
	'FILTERS_UPDATED'
);

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const CHANGE_QUERY = createAction<{key: string}>('FILTER_UPDATED');

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const SET_GROUP_BY = createAction<{groupBy: IListGroups}>('SET_GROUP_BY');

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const SET_FILTER = createAction<{filter: IReportsSavedFilter}>(
	'SET_FILTER'
);

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const ADD_FILTER = createAction<{model: IContextualMenuItem}>(
	'ADD_FILTER'
);

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const CLEAR_FILTERS = createAction('CLEAR_FILTERS');

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Reports Actions
 */
export const REMOVE_SELECTED_FILTER = createAction('REMOVE_SELECTED_FILTER');
