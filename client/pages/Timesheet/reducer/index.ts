import { createReducer } from '@reduxjs/toolkit'
import { TFunction } from 'i18next'
import { useMemo, useReducer } from 'react'
import { find, first, isEmpty } from 'underscore'
import {
  ITimesheetParams,
  ITimesheetState,
  TimesheetPeriod,
  TimesheetScope
} from '../types'
import {
  CHANGE_PERIOD,
  CHANGE_VIEW,
  CLEAR_IGNORES,
  CLEAR_MANUAL_MATCH,
  DATA_UPDATED,
  IGNORE_EVENT,
  MANUAL_MATCH,
  SET_SCOPE,
  SUBMITTING_PERIOD,
  TOGGLE_SHORTCUTS,
  UNSUBMITTING_PERIOD
} from './actions'

interface ITimesheetReducerParams {
  /**
   * URL parameters
   */
  url: ITimesheetParams

  /**
   * Translate function
   */
  t: TFunction
}

const initState = (url: ITimesheetParams) => ({
  periods: [],
  scope: isEmpty(Object.keys(url))
    ? new TimesheetScope()
    : new TimesheetScope().fromParams(url),
  selectedView: url.view || 'overview'
})

/**
 * Creating reducer for Timesheet using reduxjs/toolkit
 */
const createTimesheetReducer = ({ url, t }: ITimesheetReducerParams) =>
  createReducer<ITimesheetState>(initState(url), {
    [DATA_UPDATED.type]: (
      state,
      { payload }: ReturnType<typeof DATA_UPDATED>
    ) => {
      const { loading, data, error } = payload.query
      state.loading = loading
        ? {
            label: t('timesheet.loadingTimesheetLabel'),
            description: t('timesheet.loadingTimesheetDescription'),
            iconProps: { iconName: 'RecurringEvent' }
          }
        : null
      if (data) {
        const selectedPeriodId =
          state.selectedPeriod?.id || [url.week, url.month, url.year].join('_')
        state.periods = data.timesheet.map((period) =>
          new TimesheetPeriod().initialize(period)
        )
        state.selectedPeriod =
          find(state.periods, (p) => p.id === selectedPeriodId) ||
          first(state.periods)
      }
      state.error = error
    },

    [SUBMITTING_PERIOD.type]: (
      state,
      { payload }: ReturnType<typeof SUBMITTING_PERIOD>
    ) => {
      if (payload.forecast) {
        state.loading = {
          label: t('timesheet.forecastingPeriodLabel'),
          description: t('timesheet.forecastingPeriodDescription'),
          iconProps: { iconName: 'PlanView' }
        }
      } else {
        state.loading = {
          label: t('timesheet.confirmingPeriodLabel'),
          description: t('timesheet.confirmingPeriodDescription'),
          iconProps: { iconName: 'CheckMark' }
        }
      }
    },

    [UNSUBMITTING_PERIOD.type]: (
      state,
      { payload }: ReturnType<typeof UNSUBMITTING_PERIOD>
    ) => {
      if (payload.forecast) {
        state.loading = {
          label: t('timesheet.unforecastingPeriodLabel'),
          description: t('timesheet.unforecastingPeriodDescription'),
          iconProps: { iconName: 'ClearFormattingEraser' }
        }
      } else {
        state.loading = {
          label: t('timesheet.unconfirmingPeriodLabel'),
          description: t('timesheet.unconfirmingPeriodDescription'),
          iconProps: { iconName: 'SkypeCircleArrow' }
        }
      }
    },

    [SET_SCOPE.type]: (state, { payload }: ReturnType<typeof SET_SCOPE>) => {
      state.scope = payload.scope
    },

    [CHANGE_PERIOD.type]: (
      state,
      { payload }: ReturnType<typeof CHANGE_PERIOD>
    ) => {
      state.selectedPeriod = find(
        state.periods,
        (p: TimesheetPeriod) => p.id === payload.id
      )
    },

    [CHANGE_VIEW.type]: (
      state,
      { payload }: ReturnType<typeof CHANGE_VIEW>
    ) => {
      state.selectedView = payload.view
    },

    [MANUAL_MATCH.type]: (
      state,
      { payload }: ReturnType<typeof MANUAL_MATCH>
    ) => {
      const { eventId, project } = payload
      state.selectedPeriod.setManualMatch(eventId, project)
      state.periods = state.periods.map((p) =>
        p.id === state.selectedPeriod.id ? state.selectedPeriod : p
      )
    },

    [CLEAR_MANUAL_MATCH.type]: (
      state,
      { payload }: ReturnType<typeof CLEAR_MANUAL_MATCH>
    ) => {
      state.selectedPeriod.clearManualMatch(payload.id)
      state.periods = state.periods.map((p) =>
        p.id === state.selectedPeriod.id ? state.selectedPeriod : p
      )
    },

    [IGNORE_EVENT.type]: (
      state,
      { payload }: ReturnType<typeof IGNORE_EVENT>
    ) => {
      state.selectedPeriod.ignoreEvent(payload.id)
      state.periods = state.periods.map((p) =>
        p.id === state.selectedPeriod.id ? state.selectedPeriod : p
      )
    },

    [CLEAR_IGNORES.type]: (state) => {
      state.selectedPeriod.clearIgnoredEvents()
      state.periods = state.periods.map((p) =>
        p.id === state.selectedPeriod.id ? state.selectedPeriod : p
      )
    },

    [TOGGLE_SHORTCUTS.type]: (state) => {
      state.showHotkeysModal = !state.showHotkeysModal
    }
  })

/**
 * Use Timesheet reducer
 *
 * @param params - Parameters
 */
export function useTimesheetReducer(params: ITimesheetReducerParams) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reducer = useMemo(() => createTimesheetReducer(params), [])
  const [state, dispatch] = useReducer(reducer, initState(params.url))
  return { state, dispatch }
}
