import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { ActionBar } from './ActionBar'
import AllocationView from './AllocationView'
import { ErrorBar } from './ErrorBar'
import { useHotkeys } from './hooks/useHotkeys'
import { useTimesheet } from './hooks/useTimesheet'
import { Overview } from './Overview'
import { CHANGE_VIEW } from './reducer/actions'
import { SummaryView } from './SummaryView'
import styles from './Timesheet.module.scss'
import { TimesheetView } from './types'

export const Timesheet: FunctionComponent = () => {
  const { state, dispatch, context, TimesheetContextProvider, t } = useTimesheet()
  const { HotKeysProvider } = useHotkeys(context)

  return (
    <TimesheetContextProvider>
      <HotKeysProvider>
        <div className={styles.root}>
          <ActionBar />
          <ErrorBar error={context.error} />
          <Pivot
            defaultSelectedKey={state.selectedView}
            onLinkClick={({ props }) =>
              dispatch(CHANGE_VIEW({ view: props.itemKey as TimesheetView }))
            }>
            <PivotItem
              itemKey='overview'
              headerText={t('timesheet.overviewHeaderText')}
              itemIcon='CalendarWeek'
              headerButtonProps={{ disabled: !!context.error }}>
              <Overview dayFormat='dddd DD' timeFormat='HH:mm' />
            </PivotItem>
            <PivotItem
              itemKey='summary'
              headerText={t('timesheet.summaryHeaderText')}
              itemIcon='List'
              headerButtonProps={{ disabled: !!context.error }}>
              <SummaryView />
            </PivotItem>
            <PivotItem
              itemKey='allocation'
              headerText={t('timesheet.allocationHeaderText')}
              itemIcon='ReportDocument'
              headerButtonProps={{ disabled: !!context.error }}>
              <AllocationView />
            </PivotItem>
          </Pivot>
        </div>
      </HotKeysProvider>
    </TimesheetContextProvider>
  )
}
