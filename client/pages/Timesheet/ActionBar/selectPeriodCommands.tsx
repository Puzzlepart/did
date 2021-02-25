import { DefaultButton, IContextualMenuItem } from 'office-ui-fabric'
import * as React from 'react'
import { ITimesheetContext } from '../context'
import { CHANGE_PERIOD } from '../reducer/actions'
import styles from './ActionBar.module.scss'

export default ({
  periods,
  selectedPeriod,
  dispatch,
  t
}: ITimesheetContext): IContextualMenuItem[] => {
  if (periods.length === 1) return []
  return periods.map((period, idx) => ({
    key: `SELECT_PERIOD_COMMANDS_${idx}`,
    onRender: () => (
      <DefaultButton
        iconProps={{ iconName: 'DateTime' }}
        onClick={() => dispatch(CHANGE_PERIOD({ id: period.id }))}
        text={period.getName(t, true)}
        styles={{ root: { height: 44, marginLeft: 4, borderRadius: 15 } }}
        className={styles.selectPeriodButton}
        checked={period.id === selectedPeriod.id}
      />
    )
  }))
}
