import { DefaultButton } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../context'
import { CHANGE_PERIOD } from '../reducer/actions'
import styles from './ActionBar.module.scss'

/**
 * Use period commands
 */
export function usePeriodCommands() {
  const { t } = useTranslation()
  const context = useContext(TimesheetContext)
  if (context.periods.length === 1) return []
  return context.periods.map((period, idx) => ({
    key: `SELECT_PERIOD_COMMANDS_${idx}`,
    onRender: () => (
      <DefaultButton
        iconProps={{ iconName: 'DateTime' }}
        onClick={() => context.dispatch(CHANGE_PERIOD({ id: period.id }))}
        text={period.getName(t, true)}
        styles={{ root: { height: 44, marginLeft: 4, borderRadius: 15 } }}
        className={styles.selectPeriodButton}
        checked={period.id === context.selectedPeriod.id}
      />
    )
  }))
}
