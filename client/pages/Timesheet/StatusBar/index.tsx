
import { UserMessage } from 'components/UserMessage'
import { IUserMessageProps } from 'components/UserMessage/IUserMessageProps'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import DateUtils from 'utils/date'
import { TimesheetContext } from '../'
import styles from './StatusBar.module.scss'


export const StatusBar = () => {
    const { t } = useTranslation()
    const { loading, periods, selectedPeriod, dispatch } = React.useContext(TimesheetContext)

    const defaultProps: IUserMessageProps = {
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
                        {...defaultProps}
                        hidden={selectedPeriod.isLocked}
                        text={format(t('timesheet.periodHoursSummaryText'), DateUtils.getDurationString(selectedPeriod.totalDuration, t))}
                        iconName='ReminderTime' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration === 0 || selectedPeriod.isConfirmed}
                        text={format(t('timesheet.hoursNotMatchedText'), DateUtils.getDurationString(selectedPeriod.unmatchedDuration, t))}
                        type={MessageBarType.warning}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration > 0 || selectedPeriod.isLocked}
                        text={t('timesheet.allHoursMatchedText')}
                        type={MessageBarType.success}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={!selectedPeriod.isConfirmed}
                        text={format(t('timesheet.periodConfirmedText'), DateUtils.getDurationString(selectedPeriod.matchedDuration, t))}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultProps}
                        hidden={!selectedPeriod.isForecasted}
                        text={format(t('timesheet.periodForecastedText'), DateUtils.getDurationString(selectedPeriod.matchedDuration, t))}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.ignoredEvents.length === 0 || selectedPeriod.isLocked}
                        iconName='DependencyRemove'>
                        <p>
                            <span>{format(t('timesheet.ignoredEventsText'), selectedPeriod.ignoredEvents.length)}</span>
                            <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{t('timesheet.undoIgnoreText')}</a>
                        </p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.errors.length === 0}
                        type={MessageBarType.severeWarning}
                        iconName='ErrorBadge'>
                        <p>{t('timesheet.unresolvedErrorText', { count: selectedPeriod.errors.length })}</p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={periods.length < 2}
                        iconName='SplitObject'>
                        <p>{t('timesheet.splitWeekInfoText')}</p>
                    </UserMessage>
                </div>
            )}
        </div >
    )
}