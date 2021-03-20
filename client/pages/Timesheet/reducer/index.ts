/* eslint-disable react-hooks/exhaustive-deps */
import { createReducer, current } from '@reduxjs/toolkit'
import { TFunction } from 'i18next'
import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { TimesheetPeriodObject } from 'types'
import { find, first, isEmpty, last } from 'underscore'
import {
  ITimesheetParameters,
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
  NEXT_PERIOD,
  PREVIOUS_PERIOD,
  SET_SCOPE,
  SUBMITTING_PERIOD,
  TOGGLE_SHORTCUTS,
  UNSUBMITTING_PERIOD
} from './actions'

interface ITimesheetReducerParameters {
  /**
   * URL parameters
   */
  url: ITimesheetParameters

  /**
   * Translate function
   */
  t: TFunction
}

/**
 * Initializes state based on url parameters
 *
 * @param url - Url parameters
 * @returns Initial state
 */
const initState = (url: ITimesheetParameters): ITimesheetState => ({
  periods: [],
  scope: isEmpty(Object.keys(url))
    ? new TimesheetScope()
    : new TimesheetScope().fromParams(url),
  selectedView: url.view || 'overview',
  navHistory: []
})

/**
 * Creating reducer for Timesheet using reduxjs/toolkit
 */
const createTimesheetReducer = ({ url, t }: ITimesheetReducerParameters) =>
  createReducer<ITimesheetState>(initState(url), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.query.loading
          ? {
              label: t('timesheet.loadingTimesheetLabel'),
              description: t('timesheet.loadingTimesheetDescription'),
              iconProps: { iconName: 'RecurringEvent' }
            }
          : null
        if (payload.query.data) {
          const urlPeriodId = [url.week, url.month, url.year].join('_')
          const selectedPeriodId = state.selectedPeriod?.id || urlPeriodId
          state.periods = payload.query.data.periods.map(
            (period: TimesheetPeriodObject) =>
              new TimesheetPeriod().initialize(period)
          )
          const lastNav = last(state.navHistory)
          state.selectedPeriod =
            find(state.periods, (p) => p.id === selectedPeriodId) ||
            (lastNav === 'PREVIOUS_PERIOD'
              ? last(state.periods)
              : first(state.periods))
        }
        state.error = payload.query.error
      })
      .addCase(SET_SCOPE, (state, { payload }) => {
        state.scope =
          typeof payload === 'string' ? state.scope.set(payload) : payload
      })
      .addCase(SUBMITTING_PERIOD, (state, { payload }) => {
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
      })
      .addCase(UNSUBMITTING_PERIOD, (state, { payload }) => {
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
      })
      .addCase(CHANGE_PERIOD, (state, { payload }) => {
        state.selectedPeriod = find(
          state.periods,
          (p: TimesheetPeriod) => p.id === payload.id
        )
      })
      .addCase(PREVIOUS_PERIOD, (state) => {
        state.navHistory.push(PREVIOUS_PERIOD.type)
        const { periods, selectedPeriod } = current(state)
        const index = periods.indexOf(selectedPeriod)
        if (state.periods.length === 1 || index === 0) {
          state.scope = state.scope.set('-1w')
        } else {
          state.selectedPeriod = find(
            periods,
            (p: TimesheetPeriod) => p.id !== selectedPeriod.id
          )
        }
      })
      .addCase(NEXT_PERIOD, (state) => {
        state.navHistory.push(NEXT_PERIOD.type)
        const { periods, selectedPeriod } = current(state)
        const index = periods.indexOf(selectedPeriod)
        if (state.periods.length === 1 || index === 1) {
          state.scope = state.scope.set('1w')
        } else {
          state.selectedPeriod = find(
            periods,
            (p: TimesheetPeriod) => p.id !== selectedPeriod.id
          )
        }
      })
      .addCase(CHANGE_VIEW, (state, { payload }) => {
        state.selectedView = payload.view
      })
      .addCase(MANUAL_MATCH, (state, { payload }) => {
        const { eventId, project } = payload
        state.selectedPeriod.setManualMatch(eventId, project)
        state.periods = state.periods.map((p) =>
          p.id === state.selectedPeriod.id ? state.selectedPeriod : p
        )
      })
      .addCase(CLEAR_MANUAL_MATCH, (state, { payload }) => {
        state.selectedPeriod.clearManualMatch(payload.id)
        state.periods = state.periods.map((p) =>
          p.id === state.selectedPeriod.id ? state.selectedPeriod : p
        )
      })
      .addCase(IGNORE_EVENT, (state, { payload }) => {
        state.selectedPeriod.ignoreEvent(payload.id)
        state.periods = state.periods.map((p) =>
          p.id === state.selectedPeriod.id ? state.selectedPeriod : p
        )
      })
      .addCase(CLEAR_IGNORES, (state) => {
        state.selectedPeriod.clearIgnoredEvents()
        state.periods = state.periods.map((p) =>
          p.id === state.selectedPeriod.id ? state.selectedPeriod : p
        )
      })
      .addCase(TOGGLE_SHORTCUTS, (state) => {
        state.showHotkeysModal = !state.showHotkeysModal
      })
  )

/**
 * Use Timesheet reducer
 */
export function useTimesheetReducer() {
  const { t } = useTranslation()
  const url = useParams<ITimesheetParameters>()
  const reducer = useMemo(() => createTimesheetReducer({ t, url }), [])
  return useReducer(reducer, initState(url))
}
