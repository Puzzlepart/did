import { IContextualMenuItem } from 'office-ui-fabric-react'
import { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../context'
import { CHANGE_PERIOD } from '../reducer/actions'

/**
 * Period commands hook
 */
export function usePeriodCommands() {
  const { t } = useTranslation()
  const context = useContext(TimesheetContext)
  if (context.periods.length === 1) return []
  return context.periods.map(
    (period, index) =>
      ({
        key: `SELECT_PERIOD_COMMANDS_${index}`,
        iconProps: !isMobile && { iconName: 'DateTime' },
        style: isMobile ? {} : { padding: '12px 18px 12px 18px' },
        text: period.getName(t, true),
        canCheck: true,
        checked: period.id === context.selectedPeriod.id,
        onClick: () => context.dispatch(CHANGE_PERIOD({ id: period.id }))
      } as IContextualMenuItem)
  )
}
