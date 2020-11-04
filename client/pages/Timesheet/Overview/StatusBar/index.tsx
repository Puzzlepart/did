import { UserMessage } from 'components/UserMessage'
import { IUserMessageProps } from 'components/UserMessage/types'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import dateUtils from 'utils/date'
import { TimesheetContext } from '../..'
import styles from './StatusBar.module.scss'

export const StatusBar = () => {
    const { t } = useTranslation()
    const {
        loading,
        selectedPeriod,
        periods,
        dispatch
    } = useContext(TimesheetContext)

    const defaultMessageProps: IUserMessageProps = {
        className: styles.message,
        fixedCenter: 65,
        containerStyle: {},
    }

    const messages: IUserMessageProps[] = []

    if (!selectedPeriod.isConfirmed) {
        messages.push({
            text: t(
                'timesheet.periodHoursSummaryText',
                { hours: dateUtils.getDurationString(selectedPeriod.totalDuration, t) }
            ),
            iconName: 'ReminderTime'
        })
    }
    if (!selectedPeriod.isComplete && !selectedPeriod.isForecast) {
        messages.push({
            text: t(
                'timesheet.hoursNotMatchedText',
                { hours: dateUtils.getDurationString(selectedPeriod.unmatchedDuration, t) }
            ),
            type: MessageBarType.warning,
            iconName: 'BufferTimeBoth'
        })
    }
    if (selectedPeriod.isComplete && !selectedPeriod.isLocked) {
        messages.push({
            text: t('timesheet.allHoursMatchedText'),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        })
    }
    if (selectedPeriod.isConfirmed) {
        messages.push({
            text: t(
                'timesheet.periodConfirmedText',
                { hours: dateUtils.getDurationString(selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'CheckMark'
        })
    }
    if (selectedPeriod.isForecasted) {
        messages.push({
            text: t(
                'timesheet.periodForecastedText',
                { hours: dateUtils.getDurationString(selectedPeriod.forecastedHours, t) }
            ),
            type: MessageBarType.info,
            iconName: 'BufferTimeBoth'
        })
    }
    if (!isEmpty(selectedPeriod.ignoredEvents) && !selectedPeriod.isConfirmed) {
        messages.push({
            children: (
                <p>
                    <span>{t('timesheet.ignoredEventsText', { ignoredEvents: selectedPeriod.ignoredEvents.length })}</span>
                    <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{t('timesheet.undoIgnoreText')}</a>
                </p>
            ),
            iconName: 'DependencyRemove',
        })
    }
    if (!isEmpty(selectedPeriod.errors)) {
        messages.push({
            type: MessageBarType.severeWarning,
            text: t('timesheet.unresolvedErrorText', { count: selectedPeriod.errors.length }),
            iconName: 'ErrorBadge'
        })
    }
    if (periods.length > 1) {
        messages.push({
            text: t('timesheet.splitWeekInfoText'),
            iconName: 'SplitObject'
        })
    }

    return (
        <div className={styles.root}>
            <Shimmer
                styles={{ shimmerWrapper: { height: 65 } }}
                isDataLoaded={!loading} />
            {!loading && (
                <div className={styles.container}>
                    {messages.map((msg, key) => (
                        <UserMessage key={key} {...defaultMessageProps} {...msg} />
                    ))}
                </div>
            )}
        </div >
    )
}