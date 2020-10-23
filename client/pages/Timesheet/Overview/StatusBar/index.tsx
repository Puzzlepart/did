/* eslint-disable @typescript-eslint/camelcase */

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
    const context = useContext(TimesheetContext)

    const defaultMessageProps: IUserMessageProps = {
        className: styles.message,
        fixedCenter: 65,
        containerStyle: {},
    }

    const messages: IUserMessageProps[] = []

    if (!context.selectedPeriod.isLocked) {
        messages.push({
            hidden: context.selectedPeriod.isLocked,
            text: t(
                'timesheet.periodHoursSummaryText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.totalDuration, t) }
            ),
            iconName: 'ReminderTime'
        })
    }
    if (!context.selectedPeriod.isComplete && !context.selectedPeriod.isForecast) {
        messages.push({
            text: t(
                'timesheet.hoursNotMatchedText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.unmatchedDuration, t) }
            ),
            type: MessageBarType.warning,
            iconName: 'BufferTimeBoth'
        })
    }
    if (context.selectedPeriod.isComplete && !context.selectedPeriod.isLocked) {
        messages.push({
            text: t('timesheet.allHoursMatchedText'),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        })
    }
    if (context.selectedPeriod.isConfirmed) {
        messages.push({
            text: t(
                'timesheet.periodConfirmedText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'CheckMark'
        })
    }
    if (context.selectedPeriod.isForecasted) {
        messages.push({
            text: t(
                'timesheet.periodForecastedText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        })
    }
    if (!isEmpty(context.selectedPeriod.ignoredEvents) && !context.selectedPeriod.isLocked) {
        messages.push({
            iconName: 'DependencyRemove',
            children: (
                <p>
                    <span>{t('timesheet.ignoredEventsText', { ignored_count: context.selectedPeriod.ignoredEvents.length })}</span>
                    <a href='#' onClick={() => context.dispatch({ type: 'CLEAR_IGNORES' })}>{t('timesheet.undoIgnoreText')}</a>
                </p>
            )
        })
    }
    if (!isEmpty(context.selectedPeriod.errors)) {
        messages.push({
            type: MessageBarType.severeWarning,
            text: t('timesheet.unresolvedErrorText', { count: context.selectedPeriod.errors.length }),
            iconName: 'ErrorBadge'
        })
    }
    if (context.periods.length > 1) {
        messages.push({
            text: t('timesheet.splitWeekInfoText'),
            iconName: 'SplitObject'
        })
    }

    return (
        <div className={styles.root}>
            <Shimmer styles={{ shimmerWrapper: { height: 65 } }} isDataLoaded={!context.loading} />
            {!context.loading && (
                <div className={styles.container}>
                    {messages.map((msg, id) => (
                        <UserMessage key={id} {...defaultMessageProps} {...msg} />
                    ))}
                </div>
            )}
        </div >
    )
}