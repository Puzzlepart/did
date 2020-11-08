import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

export default ({ periods,  selectedPeriod, dispatch, t }: ITimesheetContext): IContextualMenuItem[] => {
    if (periods.length === 1) return []
    return periods.map((period, idx) => ({
        key: `SELECT_PERIOD_COMMANDS_${idx}`,
        onRender: () => (
            <DefaultButton
                iconProps={{ iconName: 'DateTime' }}
                onClick={() => dispatch({ type: 'CHANGE_PERIOD', payload: period.id })}
                text={period.getName(true, t)}
                styles={{ root: { height: 44, marginLeft: 4, borderRadius: 15 } }}
                className={styles.selectPeriodButton}
                checked={period.id === selectedPeriod.id} />
        ),
    }))
}