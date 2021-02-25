import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { IFilter } from 'components/FilterPanel'
import { IListGroups } from 'components/List/types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { IReportsSavedFilter } from '../types'

export const INIT = createAction('INIT')
export const TOGGLE_FILTER_PANEL = createAction('TOGGLE_FILTER_PANEL')
export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')
export const FILTERS_UPDATED = createAction<{ filters: IFilter[] }>('FILTERS_UPDATED')
export const CHANGE_QUERY = createAction<{ key: string }>('FILTER_UPDATED')
export const SET_GROUP_BY = createAction<{ groupBy: IListGroups }>('SET_GROUP_BY')
export const SET_FILTER = createAction<{ filter: IReportsSavedFilter }>('SET_FILTER')
export const ADD_FILTER = createAction<{ model: IContextualMenuItem }>('ADD_FILTER')
export const CLEAR_FILTERS = createAction('CLEAR_FILTERS')
export const REMOVE_SELECTED_FILTER = createAction('REMOVE_SELECTED_FILTER')
