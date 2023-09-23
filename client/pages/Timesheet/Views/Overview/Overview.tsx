/* eslint-disable unicorn/prefer-ternary */
import { DateRangeType, Pivot, PivotItem } from '@fluentui/react'
import { mergeClasses } from '@fluentui/react-components'
import { EventList } from 'components'
import { Tabs } from 'components/Tabs'
import React, { ReactElement } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useTimesheetContext } from '../../context'
import { CHANGE_PERIOD } from '../../reducer/actions'
import { TimesheetViewComponent } from '../types'
import { MatchEventPanel } from './MatchEventPanel'
import styles from './Overview.module.scss'
import { useOverview } from './useOverview'

/**
 * @category Timesheet
 */
export const Overview: TimesheetViewComponent = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const { eventListProps } = useOverview()
  let element: ReactElement = null
  switch (state.dateRangeType) {
    case DateRangeType.Week: {
      {
        element = (
          <EventList
            {...eventListProps}
            items={state.selectedPeriod?.getEvents()}
          />
        )
      }
      break
    }
    case DateRangeType.Month: {
      {
        if (state.loading && _.isEmpty(state.periods)) {
          element = (
            <EventList {...eventListProps} />
          )
        } else {
          element = (
            <Tabs
              defaultSelectedValue={state.selectedPeriod?.id}
              items={[...state.periods].reduce((_items, period) => ({
                ..._items,
                [period.id]: [EventList, period.getName(t), {
                  ...eventListProps,
                  items: period.getEvents()
                }]
              }), {})}
              onTabSelect={(id) => {
                dispatch(CHANGE_PERIOD({ id }))
              }} />
          )
        }
      }
      break
    }
  }
  return (
    <div
      className={mergeClasses(Overview.className, isMobile && styles.mobile)}
    >
      {element}
      <MatchEventPanel />
    </div>
  )
}

Overview.id = 'overview'
Overview.displayName = 'Overview'
Overview.className = styles.overview
