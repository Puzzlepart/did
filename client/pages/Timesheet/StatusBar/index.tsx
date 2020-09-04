
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

/**
 * @category Timesheet
 */
export const StatusBar = () => {
    const { t } = useTranslation(['timesheet', 'common'])
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
                        hidden={selectedPeriod.confirmed}
                        text={format(t('periodHoursSummaryText'), DateUtils.getDurationDisplay(selectedPeriod.totalDuration, t))}
                        iconName='ReminderTime' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration === 0 || selectedPeriod.confirmed}
                        text={format(t('hoursNotMatchedText'), DateUtils.getDurationDisplay(selectedPeriod.unmatchedDuration, t))}
                        type={MessageBarType.warning}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration > 0 || selectedPeriod.confirmed}
                        text={t('allHoursMatchedText')}
                        type={MessageBarType.success}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={!selectedPeriod.confirmed}
                        text={format(t('periodConfirmedText'), DateUtils.getDurationDisplay(selectedPeriod.matchedDuration, t))}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.ignoredEvents.length === 0 || selectedPeriod.confirmed}
                        iconName='DependencyRemove'>
                        <p>
                            <span>{format(t('ignoredEventsText'), selectedPeriod.ignoredEvents.length)}</span>
                            <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{t('undoIgnoreText')}</a>
                        </p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.errors.length === 0}
                        type={MessageBarType.severeWarning}
                        iconName='ErrorBadge'>
                        <p>{format(t('unresolvedErrorText'), selectedPeriod.errors.length)}</p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={periods.length < 2}
                        iconName='SplitObject'>
                        <p>{t('splitWeekInfoText')}</p>
                    </UserMessage>
                </div>
            )}
        </div >
    )
}