import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../'
import styles from './ActionBar.module.scss'
import * as commands from './commands'

export const ActionBar = () => {
    const { t } = useTranslation()
    const context = useContext(TimesheetContext)
    const items = [
        commands.GO_TO_CURRENT_WEEK(context, t),
        commands.GO_TO_PREV_WEEK(context, t),
        commands.GO_TO_NEXT_WEEK(context, t),
        commands.WEEK_PICKER(),
        ...commands.CHANGE_PERIOD(context, t),
    ]
    const farItems = [
        commands.CONFIRM_ACTIONS(context, t),
        commands.FORECAST_ACTIONS(context, t)
    ]

    return (
        <CommandBar
            className={styles.root}
            styles={{ root: { padding: 0 } }}
            items={items}
            farItems={farItems}
        />
    )
}
