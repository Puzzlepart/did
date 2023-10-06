/* eslint-disable tsdoc/syntax */
import { DateRangeType } from '@fluentui/react'
import { Tab, TabList } from '@fluentui/react-components'
import { HotkeyModal } from 'components/HotkeyModal'
import React, { FC } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { ActionBar } from './ActionBar'
import { TimesheetContext } from './context'
import { ErrorBar } from './ErrorBar'
import { useTimesheet } from './hooks'
import { useHotkeys } from './hotkeys/useHotkeys'
import { CHANGE_VIEW, TOGGLE_SHORTCUTS } from './reducer/actions'
import { StatusBar } from './StatusBar'
import { useViews, View } from './Views'

/**
 * @category Function Component
 */
export const Timesheet: FC = () => {
  const { state, dispatch, context } = useTimesheet()
  const { views, getViewById } = useViews()
  const { hotkeysProps } = useHotkeys(context)

  return (
    <TimesheetContext.Provider value={context}>
      <GlobalHotKeys {...hotkeysProps}>
        <div>
          <ActionBar />
          <ErrorBar error={state.error} />
          <StatusBar />
          <TabList
            selectedValue={state.selectedView.id}
            onTabSelect={(_, data) => {
              dispatch(CHANGE_VIEW({ view: getViewById(data.value as string) }))
            }}
          >
            {views.map(({ id, displayName }, index) => (
              <Tab key={index} value={id} content={displayName} />
            ))}
          </TabList>
          <View component={state.selectedView} />
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

Timesheet.displayName = 'Timesheet'
Timesheet.defaultProps = {
  dateRangeType: DateRangeType.Week
}
