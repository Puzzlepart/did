/* eslint-disable tsdoc/syntax */
import { TabContainer } from 'components'
import { HotkeyModal } from 'components/HotkeyModal'
import React, { FunctionComponent } from 'react'
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
          <TabContainer
            selectedKey={context.selectedView}
            onLinkClick={({ props }) =>
              context.dispatch(
                CHANGE_VIEW({ view: props.itemKey as TimesheetView })
              )
            }
            itemProps={{
              headerButtonProps: { disabled: !!context.error }
            }}>
            <Overview
              itemKey='overview'
              headerText={t('timesheet.overviewHeaderText')}
              itemIcon='CalendarWeek'
            />
            <SummaryView
              itemKey='summary'
              headerText={t('timesheet.summaryHeaderText')}
              itemIcon='List'
            />
            <AllocationView
              itemKey='allocation'
              headerText={t('timesheet.allocationHeaderText')}
              itemIcon='ReportDocument'
            />
          </TabContainer>
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
