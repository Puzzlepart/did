/* eslint-disable @typescript-eslint/camelcase */

import { UserMessage } from 'components/UserMessage'
import { IUserMessageProps } from 'components/UserMessage/IUserMessageProps'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import dateUtils from 'utils/date'
import { TimesheetContext } from '../'
import styles from './StatusBar.module.scss'


export const StatusBar = () => {
    const { t } = useTranslation()
    const { loading, periods, selectedPeriod, dispatch } = React.useContext(TimesheetContext)

    const defaultMessageProps: IUserMessageProps = {
        className: styles.message,
        fixedCenter: 65,
        containerStyle: { padding: '0 4px 0 4px' },
    }

    return (
        <div className={styles.root}>
            <Shimmer styles={{ shimmerWrapper: { height: 65 } }} isDataLoaded={!loading} />
            {!loading && (
                <div className={styles.container}>
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={selectedPeriod.isConfirmed}
                        text={t('timesheet.periodHoursSummaryText', { hours: dateUtils.getDurationString(selectedPeriod.totalDuration, t) })}
                        iconName='ReminderTime' />
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={selectedPeriod.unmatchedDuration === 0 || selectedPeriod.isConfirmed}
                        text={t('timesheet.hoursNotMatchedText', { hours: dateUtils.getDurationString(selectedPeriod.unmatchedDuration, t) })}
                        type={MessageBarType.warning}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={selectedPeriod.unmatchedDuration > 0 || selectedPeriod.isConfirmed}
                        text={t('timesheet.allHoursMatchedText')}
                        type={MessageBarType.success}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={!selectedPeriod.isConfirmed}
                        text={t('timesheet.periodConfirmedText', { hours: dateUtils.getDurationString(selectedPeriod.matchedDuration, t) })}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={selectedPeriod.ignoredEvents.length === 0 || selectedPeriod.isConfirmed}
                        iconName='DependencyRemove'>
                        <p>
                            <span>{t('timesheet.ignoredEventsText', { ignored_count: selectedPeriod.ignoredEvents.length })}</span>
                            <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{t('timesheet.undoIgnoreText')}</a>
                        </p>
                    </UserMessage>
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={selectedPeriod.errors.length === 0}
                        type={MessageBarType.severeWarning}
                        iconName='ErrorBadge'>
                        <p>{t('timesheet.unresolvedErrorText', { count: selectedPeriod.errors.length })}</p>
                    </UserMessage>
                    <UserMessage
                        {...defaultMessageProps}
                        hidden={periods.length < 2}
                        iconName='SplitObject'>
                        <p>{t('timesheet.splitWeekInfoText')}</p>
                    </UserMessage>
                </div>
            )}
        </div >
    )
}