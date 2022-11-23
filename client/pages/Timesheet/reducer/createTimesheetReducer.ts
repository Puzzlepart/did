import { DateRangeType } from '@fluentui/react'
import { createReducer, current } from '@reduxjs/toolkit'
import { TimesheetPeriodObject } from 'types'
import _ from 'underscore'
import { ITimesheetState, TimesheetDateRange, TimesheetPeriod } from '../types'
import {
  CHANGE_DATE_RANGE_TYPE,
  CHANGE_PERIOD,
  CHANGE_VIEW,
  CLEAR_IGNORES,
  CLEAR_MANUAL_MATCH,
  DATA_UPDATED,
  IGNORE_ALL,
  IGNORE_EVENT,
  MANUAL_MATCH,
  NEXT_PERIOD,
  PREVIOUS_PERIOD,
  SET_DATE_RANGE,
  SUBMITTING_PERIOD,
  TOGGLE_SHORTCUTS,
  UNSUBMITTING_PERIOD
} from './actions'
import { initState } from './initState'
import { ITimesheetReducerParameters } from './types'

/**
 * Creating reducer for `<Timesheet />` using `reduxjs/toolkit`
 *
 * @param parameters - Timesheet reducer parameters
 */
export function createTimesheetReducer(
  parameters: ITimesheetReducerParameters
) {
  return createReducer<ITimesheetState>(initState(parameters), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.query.loading
          ? {
              label: parameters.t('timesheet.loadingTimesheetLabel'),
              description: parameters.t(
                'timesheet.loadingTimesheetDescription'
              ),
              iconProps: { iconName: 'RecurringEvent' }
            }
          : null
        if (payload.query.data) {
          const urlPeriodId = [
            parameters.url.week,
            parameters.url.month,
            parameters.url.year
          ].join('_')
          const selectedPeriodId = state.selectedPeriod?.id || urlPeriodId
          state.periods = payload.query.data.periods.map(
            (period: TimesheetPeriodObject) =>
              new TimesheetPeriod().initialize(period)
          )
          const lastNav = _.last(state.navHistory)
          state.selectedPeriod =
            _.find(state.periods, (p) => p.id === selectedPeriodId) ||
            (lastNav === 'PREVIOUS_PERIOD'
              ? _.last(state.periods)
              : _.first(state.periods))
        }
        state.error = payload.query.error
      })
      .addCase(SET_DATE_RANGE, (state, { payload }) => {
        state.dateRange =
          typeof payload === 'string' ? state.dateRange.set(payload) : payload
      })
      .addCase(SUBMITTING_PERIOD, (state, { payload }) => {
        state.loading = payload.forecast
          ? {
              label: parameters.t('timesheet.forecastingPeriodLabel'),
              description: parameters.t(
                'timesheet.forecastingPeriodDescription'
              ),
              iconProps: { iconName: 'PlanView' }
            }
          : {
              label: parameters.t('timesheet.confirmingPeriodLabel'),
              description: parameters.t(
                'timesheet.confirmingPeriodDescription'
              ),
              iconProps: { iconName: 'CheckMark' }
            }
      })
      .addCase(UNSUBMITTING_PERIOD, (state, { payload }) => {
        state.loading = payload.forecast
          ? {
              label: parameters.t('timesheet.unforecastingPeriodLabel'),
              description: parameters.t(
                'timesheet.unforecastingPeriodDescription'
              ),
              iconProps: { iconName: 'ClearFormattingEraser' }
            }
          : {
              label: parameters.t('timesheet.unconfirmingPeriodLabel'),
              description: parameters.t(
                'timesheet.unconfirmingPeriodDescription'
              ),
              iconProps: { iconName: 'SkypeCircleArrow' }
            }
      })
      .addCase(CHANGE_PERIOD, (state, { payload }) => {
        state.selectedPeriod = _.find(
          state.periods,
          (p: TimesheetPeriod) => p.id === payload.id
        )
      })
      .addCase(PREVIOUS_PERIOD, (state) => {
        state.navHistory.push(PREVIOUS_PERIOD.type)
        const { periods, selectedPeriod, dateRangeType } = current(state)
        const index = periods.indexOf(selectedPeriod)
        switch (dateRangeType) {
          case DateRangeType.Week:
            {
              if (state.periods.length === 1 || index === 0) {
                state.dateRange = state.dateRange.set('-1w')
              } else {
                state.selectedPeriod = _.find(
                  periods,
                  (p: TimesheetPeriod) => p.id !== selectedPeriod.id
                )
              }
            }
            break
          case DateRangeType.Month:
            {
              state.dateRange = state.dateRange.set('-1month')
            }
            break
        }
      })
      .addCase(NEXT_PERIOD, (state) => {
        state.navHistory.push(NEXT_PERIOD.type)
        const { periods, selectedPeriod, dateRangeType } = current(state)
        const index = periods.indexOf(selectedPeriod)
        switch (dateRangeType) {
          case DateRangeType.Week:
            {
              if (state.periods.length === 1 || index === 1) {
                state.dateRange = state.dateRange.set('1w')
              } else {
                state.selectedPeriod = _.find(
                  periods,
                  (p: TimesheetPeriod) => p.id !== selectedPeriod.id
                )
              }
            }
            break
          case DateRangeType.Month:
            {
              state.dateRange = state.dateRange.set('1month')
            }
            break
        }
      })
      .addCase(CHANGE_VIEW, (state, { payload }) => {
        state.selectedView = payload.view
      })
      .addCase(CHANGE_DATE_RANGE_TYPE, (state, { payload }) => {
        state.dateRangeType = payload.dateRangeType
        state.dateRange = new TimesheetDateRange(
          state.selectedPeriod.endDate,
          payload.dateRangeType
        )
        state.periods = []
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
      .addCase(IGNORE_ALL, (state) => {
        state.selectedPeriod.ignoreAllEvents()
        state.periods = state.periods.map((p) =>
          p.id === state.selectedPeriod.id ? state.selectedPeriod : p
        )
      })
      .addCase(TOGGLE_SHORTCUTS, (state) => {
        state.showHotkeysModal = !state.showHotkeysModal
      })
  )
}
