/* eslint-disable tsdoc/syntax */
import { FlexiblePivot } from 'components'
import { HotkeyModal } from 'components/HotkeyModal'
import { PivotItem } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { isBrowser } from 'react-device-detect'
import { GlobalHotKeys } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { ActionBar } from './ActionBar'
import { AllocationView } from './AllocationView'
import { ErrorBar } from './ErrorBar'
import { useTimesheet } from './hooks'
import { useHotkeys } from './hotkeys/useHotkeys'
import { Overview } from './Overview'
import { CHANGE_VIEW, TOGGLE_SHORTCUTS } from './reducer/actions'
import { StatusBar } from './StatusBar'
import { SummaryView } from './SummaryView'
import styles from './Timesheet.module.scss'
import { TimesheetContext, TimesheetView } from './types'

/**
 * @category Function Component
 */
export const Timesheet: FunctionComponent = () => {
  const { t } = useTranslation()
  const { context } = useTimesheet()
  const { hotkeysProps } = useHotkeys(context)

  return (
    <TimesheetContext.Provider value={context}>
      <GlobalHotKeys {...hotkeysProps}>
        <div className={styles.root}>
          <ActionBar />
          <ErrorBar error={context.error} />
          <StatusBar />
          <FlexiblePivot
            selectedKey={context.selectedView}
            onLinkClick={({ props }) =>
              context.dispatch(
                CHANGE_VIEW({ view: props.itemKey as TimesheetView })
              )
            }>
            <PivotItem
              key='overview'
              itemKey='overview'
              headerText={t('timesheet.overviewHeaderText')}
              itemIcon='CalendarWeek'
              headerButtonProps={{ disabled: !!context.error }}>
              <Overview />
            </PivotItem>
            {isBrowser && (
              <PivotItem
                key='summary'
                itemKey='summary'
                headerText={t('timesheet.summaryHeaderText')}
                itemIcon='List'
                headerButtonProps={{ disabled: !!context.error }}>
                <SummaryView />
              </PivotItem>
            )}
            <PivotItem
              key='allocation'
              itemKey='allocation'
              headerText={t('timesheet.allocationHeaderText')}
              itemIcon='ReportDocument'
              headerButtonProps={{ disabled: !!context.error }}>
              <AllocationView />
            </PivotItem>
          </FlexiblePivot>
        </div>
        <HotkeyModal
          {...hotkeysProps}
          isOpen={context.showHotkeysModal}
          onDismiss={() => context.dispatch(TOGGLE_SHORTCUTS())}
        />
      </GlobalHotKeys>
    </TimesheetContext.Provider>
  )
}
