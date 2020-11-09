import EventList from 'components/EventList'
import { ProgressIndicator } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import DateUtils from 'utils/date'
import { generateColumn as col } from 'utils/generateColumn'
import { TimesheetContext } from '../'
import { StatusBar } from './StatusBar'
import CustomerColumn from './CustomerColumn'
import styles from './Overview.module.scss'
import ProjectColumn from './ProjectColumn'
import { IOverviewProps } from './types'

export const Overview = ({ dayFormat, timeFormat }: IOverviewProps) => {
    const { t } = useTranslation()
    const context = useContext(TimesheetContext)
    const className = [styles.root]
    if (isMobile) className.push(styles.mobile)
    return (
        <div 
        key={`overview_${context.selectedPeriod?.id}`}
        className={className.join(' ')}>
            <StatusBar />
            {context.loading && <ProgressIndicator {...context.loading} />}
            <EventList
                hidden={!!context.error}
                enableShimmer={!!context.loading}
                events={context.selectedPeriod?.getEvents()}
                showEmptyDays={true}
                dateFormat={timeFormat}
                groups={{
                    fieldName: 'date',
                    groupNames: context.selectedPeriod?.weekdays(dayFormat),
                    totalFunc: (events: EventObject[]) => {
                        const duration = events.reduce((sum, i) => sum + i.duration, 0)
                        return ` (${DateUtils.getDurationString(duration, t)})`
                    },
                }}
                additionalColumns={[
                    col(
                        'customer',
                        t('common.customer'),
                        { minWidth: 150, maxWidth: 200, isMultiline: true },
                        (event: EventObject) => <CustomerColumn event={event} />,
                    ),
                    col(
                        'project',
                        t('common.project'),
                        { minWidth: 150, maxWidth: 300, isMultiline: true },
                        (event: EventObject) => <ProjectColumn event={event} />
                    ),
                ]} />
        </div>
    )
}