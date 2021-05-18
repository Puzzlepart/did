import { IContextualMenuItem } from '@fluentui/react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import { CHANGE_PERIOD } from '../reducer/actions'

/**
 * Period commands hook
 */
export function usePeriodCommands() {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  if (state.periods.length === 1) return []
  return state.periods.map(
    (period, index) =>
      ({
        key: `SELECT_PERIOD_COMMANDS_${index}`,
        iconProps: !isMobile && { iconName: 'DateTime' },
        style: isMobile ? {} : { padding: '12px 18px 12px 18px' },
        text: period.getName(t, true),
        canCheck: true,
        checked: period.id === state.selectedPeriod.id,
        onClick: () => dispatch(CHANGE_PERIOD({ id: period.id }))
      } as IContextualMenuItem)
  )
}
