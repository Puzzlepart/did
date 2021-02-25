import { HotkeyModal } from 'components'
import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { ActionBar } from './ActionBar'
import AllocationView from './AllocationView'
import { ErrorBar } from './ErrorBar'
import { Overview } from './Overview'
import { CHANGE_VIEW, TOGGLE_SHORTCUTS } from './reducer/actions'
import { SummaryView } from './SummaryView'
import styles from './Timesheet.module.scss'
import { TimesheetView } from './types'
import { useTimesheet } from './useTimesheet'

export const Timesheet: FunctionComponent = () => {
  const { state, dispatch, context, TimesheetContextProvider, hotkeysProps, t } = useTimesheet()

  return (
    <TimesheetContextProvider>
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
      <HotkeyModal
        {...hotkeysProps}
        isOpen={state.showHotkeysModal}
        onDismiss={() => dispatch(TOGGLE_SHORTCUTS())}
      />
    </TimesheetContextProvider>
  )
}
