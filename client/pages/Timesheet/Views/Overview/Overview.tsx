import { DateRangeType, Pivot, PivotItem } from '@fluentui/react'
import { EventList } from 'components'
import packageFile from 'package'
import React from 'react'
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
  const { additionalColumns, listGroupProps, className } = useOverview()
  switch (state.dateRangeType) {
    case DateRangeType.Week: {
      return (
        <div className={className}>
          <EventList
            hideToolbar={true}
            hidden={!!state.error}
            enableShimmer={!!state.loading}
            items={state.selectedPeriod?.getEvents()}
            dateFormat={packageFile.config.app.TIMESHEET_OVERVIEW_TIME_FORMAT}
            listGroupProps={listGroupProps}
            additionalColumns={additionalColumns}
          />
          <MatchEventPanel />
        </div>
      )
    }
    case DateRangeType.Month: {
      if (state.loading && _.isEmpty(state.periods)) {
        return (
          <div className={className}>
            <EventList
              hideToolbar={true}
              enableShimmer={true}
              items={[]}
              listGroupProps={listGroupProps}
              additionalColumns={additionalColumns}
            />
            <MatchEventPanel />
          </div>
        )
      }
      return (
        <div className={className}>
          <Pivot
            selectedKey={state.selectedPeriod?.id}
            onLinkClick={(item) => {
              dispatch(CHANGE_PERIOD({ id: item.props.itemKey }))
            }}
          >
            {state.periods.map((period) => (
              <PivotItem
                key={period.id}
                itemKey={period.id}
                headerText={period.getName(t)}
              >
                <EventList
                  hideToolbar={true}
                  hidden={!!state.error}
                  enableShimmer={!!state.loading}
                  items={period.getEvents()}
                  dateFormat={
                    packageFile.config.app.TIMESHEET_OVERVIEW_TIME_FORMAT
                  }
                  listGroupProps={listGroupProps}
                  additionalColumns={additionalColumns}
                />
              </PivotItem>
            ))}
          </Pivot>
          <MatchEventPanel />
        </div>
      )
    }
  }
}

Overview.id = 'overview'
Overview.displayName = 'Overview'
Overview.className = styles.overview
