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
import { isMobile } from 'react-device-detect'
import styles from './StatusBar.module.scss'

export const StatusBar = () => {
    const { t } = useTranslation()
    if (isMobile) styles.root += ` ${styles.mobile}`
    const context = useContext(TimesheetContext)

    const defaultMessageProps: IUserMessageProps = {
        className: styles.message,
        fixedCenter: 65,
    }

    const messages: IUserMessageProps[] = [
        {
            hidden: context.selectedPeriod.isLocked,
            text: t(
                'timesheet.periodHoursSummaryText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.totalDuration, t) }
            ),
            iconName: 'ReminderTime'
        },
        {
            hidden: context.selectedPeriod.isComplete || context.selectedPeriod.isConfirmed || context.selectedPeriod.isForecast,
            text: t(
                'timesheet.hoursNotMatchedText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.unmatchedDuration, t) }
            ),
            type: MessageBarType.warning,
            iconName: 'BufferTimeBoth'
        },
        {
            hidden: !context.selectedPeriod.isComplete || context.selectedPeriod.isLocked,
            text: t('timesheet.allHoursMatchedText'),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        },
        {

            hidden: !context.selectedPeriod.isConfirmed,
            text: t(
                'timesheet.periodConfirmedText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'CheckMark'
        },
        {

            hidden: !context.selectedPeriod.isForecasted,
            text: t(
                'timesheet.periodForecastedText',
                { hours: dateUtils.getDurationString(context.selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        },
        {
            hidden: isEmpty(context.selectedPeriod.ignoredEvents) || context.selectedPeriod.isLocked,
            iconName: 'DependencyRemove',
            children: (
                <p>
                    <span>{t('timesheet.ignoredEventsText', { ignored_count: context.selectedPeriod.ignoredEvents.length })}</span>
                    <a href='#' onClick={() => context.dispatch({ type: 'CLEAR_IGNORES' })}>{t('timesheet.undoIgnoreText')}</a>
                </p>
            )
        },
        {
            hidden: context.selectedPeriod.errors.length === 0,
            type: MessageBarType.severeWarning,
            text: t('timesheet.unresolvedErrorText', { count: context.selectedPeriod.errors.length }),
            iconName: 'ErrorBadge'
        },
        {
            hidden: context.periods.length < 2,
            text: t('timesheet.splitWeekInfoText'),
            iconName: 'SplitObject'
        },
    ]

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