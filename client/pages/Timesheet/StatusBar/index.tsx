
import { UserMessage } from 'components/UserMessage';
import { IUserMessageProps } from 'components/UserMessage/IUserMessageProps';
import { getDurationDisplay } from 'helpers';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import * as format from 'string-format';
import { TimesheetContext } from '../';
import styles from './StatusBar.module.scss';

/**
 * @category Timesheet
 */
export const StatusBar = () => {
    const { t } = useTranslation(['timesheet', 'COMMON']);
    const { loading, periods, selectedPeriod, dispatch } = React.useContext(TimesheetContext);

    const defaultProps: IUserMessageProps = {
        className: styles.message,
        fixedCenter: 65,
        containerStyle: { padding: '0 4px 0 4px' },
    };

    return (
        <div className={styles.root}>
            <Shimmer isDataLoaded={!loading} />
            <Shimmer isDataLoaded={!loading} />
            {!loading && (
                <div className={styles.container}>
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.isConfirmed}
                        text={format(t('periodHoursSummaryText'), getDurationDisplay(selectedPeriod.totalDuration, undefined, t))}
                        iconName='ReminderTime' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration === 0 || selectedPeriod.isConfirmed}
                        text={format(t('hoursNotMatchedText'), getDurationDisplay(selectedPeriod.unmatchedDuration, undefined, t))}
                        type={MessageBarType.warning}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration > 0 || selectedPeriod.isConfirmed}
                        text={t('allHoursMatchedText')}
                        type={MessageBarType.success}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={!selectedPeriod.isConfirmed}
                        text={format(t('periodConfirmedText'), getDurationDisplay(selectedPeriod.matchedDuration, undefined, t))}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.ignoredEvents.length === 0 || selectedPeriod.isConfirmed}
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
    );
}