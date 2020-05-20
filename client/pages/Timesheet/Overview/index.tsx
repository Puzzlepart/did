import EventList from 'components/EventList'
import { ITimeEntry } from 'interfaces/ITimeEntry'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import * as React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import DateUtils from 'utils/date'
import { generateColumn as col } from 'utils/generateColumn'
import { TimesheetContext } from '../'
import { StatusBar } from '../StatusBar'
import styles from './Overview.module.scss'
import ProjectColumn from './ProjectColumn'
import { IOverviewProps } from './types'

/**
 * @category Timesheet
 */
export const Overview = ({ dayFormat, timeFormat }: IOverviewProps) => {
    const { t } = useTranslation('common')
    const { loading, selectedPeriod } = React.useContext(TimesheetContext)
    const className = [styles.root]
    if(isMobile) className.push(styles.mobile)
    return (
        <div className={className.join(' ')}>
            <StatusBar />
            {loading && <ProgressIndicator {...loading} />}
            <EventList
                enableShimmer={!!loading}
                events={selectedPeriod.events}
                showEmptyDays={true}
                dateFormat={timeFormat}
                groups={{
                    fieldName: 'date',
                    groupNames: selectedPeriod.weekdays(dayFormat),
                    totalFunc: (items: ITimeEntry[]) => {
                        const duration = items.reduce((sum, i) => sum + i.duration, 0)
                        return ` (${DateUtils.getDurationDisplay(duration, t)})`
                    },
                }}
                additionalColumns={[
                    col(
                        'project',
                        t('project'),
                        { minWidth: 350, maxWidth: 350 },
                        (event: ITimeEntry) => <ProjectColumn event={event} />
                    ),
                ]} />
        </div>
    )
}