
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
    const { t } = useTranslation(['TIMESHEET', 'COMMON']);
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
                        text={format(t('PERIOD_HOURS_SUMMARY_TEXT'), getDurationDisplay(selectedPeriod.totalDuration, undefined, t))}
                        iconName='ReminderTime' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration === 0 || selectedPeriod.isConfirmed}
                        text={format(t('HOURS_NOT_MATCHED_TEXT'), getDurationDisplay(selectedPeriod.unmatchedDuration, undefined, t))}
                        type={MessageBarType.warning}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.unmatchedDuration > 0 || selectedPeriod.isConfirmed}
                        text={t('ALL_HOURS_MATCHED_TEXT')}
                        type={MessageBarType.success}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={!selectedPeriod.isConfirmed}
                        text={format(t('PERIOD_CONFIRMED_TEXT'), getDurationDisplay(selectedPeriod.matchedDuration, undefined, t))}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.ignoredEvents.length === 0 || selectedPeriod.isConfirmed}
                        iconName='DependencyRemove'>
                        <p>
                            <span>{format(t('IGNORED_EVENTS_TEXT'), selectedPeriod.ignoredEvents.length)}</span>
                            <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{t('UNDO_IGNORE_LINK_TEXT')}</a>
                        </p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={selectedPeriod.errors.length === 0}
                        type={MessageBarType.severeWarning}
                        iconName='ErrorBadge'>
                        <p>{format(t('UNRESOLVER_ERRORS_TEXT'), selectedPeriod.errors.length)}</p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={periods.length < 2}
                        iconName='SplitObject'>
                        <p>{t('SPLIT_WEEK_TEXT')}</p>
                    </UserMessage>
                </div>
            )}
        </div >
    );
}