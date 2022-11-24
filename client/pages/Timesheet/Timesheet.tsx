/* eslint-disable tsdoc/syntax */
import { DateRangeType } from '@fluentui/react'
import { TabContainer } from 'components'
import { HotkeyModal } from 'components/HotkeyModal'
import React, { FC } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { ActionBar } from './ActionBar'
import { ErrorBar } from './ErrorBar'
import { useTimesheet } from './hooks'
import { useHotkeys } from './hotkeys/useHotkeys'
import { CHANGE_VIEW, TOGGLE_SHORTCUTS } from './reducer/actions'
import { StatusBar } from './StatusBar'
import { TimesheetContext, TimesheetView } from './types'
import { AllocationView, Overview, SummaryView } from './Views'

/**
 * @category Function Component
 */
export const Timesheet: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch, context, headerButtonProps } = useTimesheet()
  const { hotkeysProps } = useHotkeys(context)

  return (
    <TimesheetContext.Provider value={context}>
      <GlobalHotKeys {...hotkeysProps}>
        <div>
          <ActionBar />
          <ErrorBar error={state.error} />
          <StatusBar />
          <TabContainer
            hidden={!!state.error}
            selectedKey={state.selectedView ?? TimesheetView.Overview}
            onTabChanged={(itemKey) => {
              dispatch(CHANGE_VIEW({ view: itemKey as TimesheetView }))
            }}
            level={3}
          >
            <Overview
              headerButtonProps={headerButtonProps}
              itemKey={TimesheetView.Overview}
              headerText={t('timesheet.overviewHeaderText')}
            />
            <SummaryView
              headerButtonProps={headerButtonProps}
              itemKey={TimesheetView.Summary}
              headerText={t('timesheet.summaryHeaderText')}
            />
            <AllocationView
              headerButtonProps={headerButtonProps}
              itemKey={TimesheetView.Allocation}
              headerText={t('timesheet.allocationHeaderText')}
            />
          </TabContainer>
        </div>
        <HotkeyModal
          {...hotkeysProps}
          isOpen={state.showHotkeysModal}
          onDismiss={() => dispatch(TOGGLE_SHORTCUTS())}
        />
      </GlobalHotKeys>
    </TimesheetContext.Provider>
  )
}

Timesheet.defaultProps = {
  dateRangeType: DateRangeType.Week
}
