import { DateRangeType, Pivot, PivotItem } from '@fluentui/react'
import { EventList, TabComponent } from 'components'
import packageFile from 'package'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import { CHANGE_PERIOD } from '../reducer/actions'
import styles from './Overview.module.scss'
import { useAdditionalColumns } from './useAdditionalColumns'
import { useGroups } from './useGroups'

/**
 * @category Timesheet
 */
export const Overview: TabComponent = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const additionalColumns = useAdditionalColumns()
  const listGroupProps = useGroups()
  const className = [styles.root]
  if (isMobile) className.push(styles.mobile)
  switch (state.dateRangeType) {
    case DateRangeType.Week: {
      return (
        <div className={className.join(' ')}>
          <EventList
            hidden={!!state.error}
            enableShimmer={!!state.loading}
            items={state.selectedPeriod?.getEvents()}
            dateFormat={packageFile.config.app.TIMESHEET_OVERVIEW_TIME_FORMAT}
            listGroupProps={listGroupProps}
            additionalColumns={additionalColumns}
          />
        </div>
      )
    }
    case DateRangeType.Month: {
      return (
        <div className={className.join(' ')}>
          <Pivot
            defaultSelectedKey={state.selectedPeriod.id}
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
        </div>
      )
    }
  }
}
