import EventList from 'components/EventList'
import { ITimeEntry } from 'types/ITimeEntry'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import dateUtils from 'utils/date'
import { generateColumn as col } from 'utils/generateColumn'
import { TimesheetContext } from '../'
import { StatusBar } from '../StatusBar'
import styles from './Overview.module.scss'
import ProjectColumn from './ProjectColumn'
import { IOverviewProps } from './types'
import CustomerColumn from './CustomerColumn'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType } from 'office-ui-fabric-react'

export const Overview = ({ dayFormat, timeFormat }: IOverviewProps) => {
    const { t } = useTranslation()
    const context = useContext(TimesheetContext)
    const className = [styles.root]
    if (isMobile) className.push(styles.mobile)
    return (
        <div className={className.join(' ')}>
            <StatusBar hidden={!!context.error} />
            {context.loading && <ProgressIndicator {...context.loading} />}
            {!!context.error && <UserMessage text={t('timesheet.errorMessageText')} type={MessageBarType.error} />}
            <EventList
                hidden={!!context.error}
                enableShimmer={!!context.loading}
                events={context.selectedPeriod.events}
                showEmptyDays={true}
                dateFormat={timeFormat}
                groups={{
                    fieldName: 'date',
                    groupNames: context.selectedPeriod.weekdays(dayFormat),
                    totalFunc: (items: ITimeEntry[]) => {
                        const duration = items.reduce((sum, i) => sum + i.duration, 0)
                        return ` (${dateUtils.getDurationString(duration, t)})`
                    },
                }}
                additionalColumns={[
                    col(
                        'customer',
                        t('common.customer'),
                        { minWidth: 150, maxWidth: 200, isMultiline: true },
                        (event: ITimeEntry) => <CustomerColumn event={event} />,
                    ),
                    col(
                        'project',
                        t('common.project'),
                        { minWidth: 150, maxWidth: 300, isMultiline: true },
                        (event: ITimeEntry) => <ProjectColumn event={event} />
                    ),
                ]} />
        </div>
    )
}