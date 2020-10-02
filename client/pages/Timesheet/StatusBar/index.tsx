/* eslint-disable @typescript-eslint/camelcase */

import { UserMessage } from 'components/UserMessage'
import { IUserMessageProps } from 'components/UserMessage/IUserMessageProps'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
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

    const messages: IUserMessageProps[] = [
        {
            hidden: selectedPeriod.isLocked,
            text: t(
                'timesheet.periodHoursSummaryText',
                { hours: dateUtils.getDurationString(selectedPeriod.totalDuration, t) }
            ),
            iconName: 'ReminderTime'
        },
        {
            hidden: selectedPeriod.unmatchedDuration === 0 || selectedPeriod.isConfirmed,
            text: t(
                'timesheet.hoursNotMatchedText',
                { hours: dateUtils.getDurationString(selectedPeriod.unmatchedDuration, t) }
            ),
            type: MessageBarType.warning,
            iconName: 'BufferTimeBoth'
        },
        {
            hidden: selectedPeriod.unmatchedDuration > 0 || selectedPeriod.isLocked,
            text: t('timesheet.allHoursMatchedText'),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        },
        {

            hidden: !selectedPeriod.isConfirmed,
            text: t(
                'timesheet.periodConfirmedText',
                { hours: dateUtils.getDurationString(selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'CheckMark'
        },
        {

            hidden: !selectedPeriod.isForecasted,
            text: t(
                'timesheet.periodForecastedText',
                { hours: dateUtils.getDurationString(selectedPeriod.matchedDuration, t) }
            ),
            type: MessageBarType.success,
            iconName: 'BufferTimeBoth'
        },
        {
            hidden: isEmpty(selectedPeriod.ignoredEvents) || selectedPeriod.isLocked,
            iconName: 'DependencyRemove',
            children: (
                <p>
                    <span>{t('timesheet.ignoredEventsText', { ignored_count: selectedPeriod.ignoredEvents.length })}</span>
                    <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{t('timesheet.undoIgnoreText')}</a>
                </p>
            )
        },
        {
            hidden: selectedPeriod.errors.length === 0,
            type: MessageBarType.severeWarning,
            text: t('timesheet.unresolvedErrorText', { count: selectedPeriod.errors.length }),
            iconName: 'ErrorBadge'
        },
        {
            hidden: periods.length < 2,
            text: t('timesheet.splitWeekInfoText'),
            iconName: 'SplitObject'
        },
    ]

    return (
        <div className={styles.root}>
            <Shimmer styles={{ shimmerWrapper: { height: 65 } }} isDataLoaded={!loading} />
            {!loading && (
                <div className={styles.container}>
                    {messages.map((msg, id) => (
                        <UserMessage key={id} {...defaultMessageProps} {...msg} />
                    ))}
                </div>
            )}
        </div >
    )
}