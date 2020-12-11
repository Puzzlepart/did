import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { IFilter } from 'components/FilterPanel'
import { getValue } from 'helpers'
import { filter, find } from 'underscore'
import { IReportsParams, IReportsQuery, IReportsState } from './types'

export const INIT = createAction('INIT')
export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')
export const FILTER_UPDATED = createAction<{ filters: IFilter[] }>('FILTER_UPDATED')
export const CHANGE_QUERY = createAction<{ key: string }>('FILTER_UPDATED')

interface ICreateReducerParams {
    params: IReportsParams
    queries: IReportsQuery[]
}

export default ({ params, queries }: ICreateReducerParams) =>
    createReducer<IReportsState>({},
        {
            [INIT.type]: (state) => {
                state.query = find(queries, (q) => q.key === params.query) as any
            },

            [DATA_UPDATED.type]: (state, { payload }: ReturnType<typeof DATA_UPDATED>) => {
                state.loading = payload.query.loading
                state.timeentries = payload.query?.data?.timeentries || []
            },

            [FILTER_UPDATED.type]: (state, { payload }: ReturnType<typeof FILTER_UPDATED>) => {
                state.subset = filter(state.timeentries, (entry) => {
                    return (
                        filter(payload.filters, (f) => {
                            const selectedKeys = f.selected.map((s) => s.key)
                            return selectedKeys.indexOf(getValue(entry, f.key, '')) !== -1
                        }).length === payload.filters.length
                    )
                })
            }
        }
    )
