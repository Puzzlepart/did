
import List from 'components/List'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { withDefaultProps } from 'with-default-props'
import { titleColumn, timeColumn, durationColumn } from './columns'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'

/**
 * @category EventList
 */
const EventList = (props: IEventListProps): JSX.Element => {
    const { t } = useTranslation()
    const columns = [
        titleColumn(props, t('titleLabel')),
        timeColumn(props, t('timeLabel')),
        durationColumn(props, t('durationLabel')),
        ...props.additionalColumns
    ].map(col => ({
        ...col,
        isResizable: props.resizableColumns,
    }))

    return (
        <div className={styles.root}>
            <List
                enableShimmer={props.enableShimmer}
                columns={columns}
                items={props.events}
                groups={props.groups}
                groupProps={{ showEmptyGroups: props.showEmptyDays }} />
        </div>
    )
}

export default withDefaultProps(
    EventList,
    {
        additionalColumns: [],
    }
)


export * from './types'

