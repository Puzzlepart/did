import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../'
import styles from './ActionBar.module.scss'
import * as commands from './commands'

export const ActionBar = () => {
    const { t } = useTranslation()
    const context = useContext(TimesheetContext)
    const commandBarProps: ICommandBarProps = {
        styles: { root: { padding: 0 } },
        items: [
            commands.GO_TO_CURRENT_WEEK(context, t),
            commands.GO_TO_PREV_WEEK(context, t),
            commands.GO_TO_NEXT_WEEK(context, t),
            commands.WEEK_PICKER(context, t),
            ...commands.SELECT_PERIOD(context, t),
        ],
        farItems: [
            commands.RELOAD_DATA(context, t),
            commands.CONFIRM_ACTIONS(context, t),
            commands.FORECAST_ACTIONS(context, t)
        ]
    }

    return (
        <div className={styles.root} hidden={!context.loading && !context.selectedPeriod.isLoaded}>
            <CommandBar {...commandBarProps} />
        </div>
    )
}
