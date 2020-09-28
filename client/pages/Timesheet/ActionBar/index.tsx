import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../'
import * as commandBarItems from './items'
import { WeekPicker } from './WeekPicker'
import styles from './ActionBar.module.scss'

/**
 * @category Timesheet
 */
export const ActionBar = () => {
    const { t } = useTranslation()
    const context = useContext(TimesheetContext)
    const items = [
        commandBarItems.GO_TO_CURRENT_WEEK(context, t),
        commandBarItems.GO_TO_PREV_WEEK(context, t),
        commandBarItems.GO_TO_NEXT_WEEK(context, t),
        {
            key: 'WEEK_PICKER',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => <WeekPicker />,
        },
        ...commandBarItems.CHANGE_PERIOD(context, t),
    ]
    const farItems = [commandBarItems.CONFIRM_ACTIONS(context, t)]

    return (
        <CommandBar
            className={styles.root}
            styles={{ root: { padding: 0 } }}
            items={items}
            farItems={farItems}
        />
    )
}
