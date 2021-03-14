/* eslint-disable react-hooks/exhaustive-deps */
import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { ISummaryViewState } from './types'

export const DATA_UPDATED = createAction<{ data: QueryResult<any> }>(
  'DATA_UPDATED'
)

function createReducer_(initialState: ISummaryViewState) {
  return createReducer(initialState, {
    [DATA_UPDATED.type]: (
      state,
      { payload }: ReturnType<typeof DATA_UPDATED>
    ) => {
      if (payload.data) {
        state.periods = payload.data['periods']
        state.users = payload.data['users']
        state.projects = payload.data['projects']
        state.progress = null
      }
    }
  })
}

/**
 * Reducer hook for SummaryView
 *
 * @returns React.useReducer with parameters
 */
export function useSummaryViewReducer() {
  const { t } = useTranslation()
  const initialState: ISummaryViewState = {
    users: [],
    periods: [],
    projects: [],
    progress: {
      label: t('admin.summaryViewProgressLabel'),
      description: t('admin.summaryViewProgressDescription'),
      iconProps: { iconName: 'ViewList' }
    }
  }
  const reducer = useMemo(() => createReducer_(initialState), [initialState])
  return useReducer(reducer, initialState)
}
