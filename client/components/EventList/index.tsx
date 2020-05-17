
import List from 'components/List'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { withDefaultProps } from 'with-default-props'
import * as col from './columns'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'

/**
 * @category EventList
 */
const EventList = (props: IEventListProps): JSX.Element => {
    const { t } = useTranslation('COMMON')
    const columns = [
        col.Title(props, t('titleLabel')),
        col.Time(props, t('timeLabel')),
        col.Duration(props, t('durationLabel')),
        ...props.additionalColumns
    ]

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

