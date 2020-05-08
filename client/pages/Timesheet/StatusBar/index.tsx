
import { UserMessage } from 'components/UserMessage';
import { IUserMessageProps } from 'components/UserMessage/IUserMessageProps';
import { getDurationDisplay } from 'helpers';
import resource from 'i18n';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import * as format from 'string-format';
import { TimesheetContext } from '../';
import styles from './StatusBar.module.scss';

/**
 * @category Timesheet
 */
export const StatusBar = () => {
    const { state, dispatch } = React.useContext(TimesheetContext);

    const defaultProps: IUserMessageProps = {
        className: styles.message,
        fixedCenter: 65,
        containerStyle: { padding: '0 4px 0 4px' },
    };

    return (
        <div className={styles.root}>
            <Shimmer isDataLoaded={!state.loading} />
            <Shimmer isDataLoaded={!state.loading} />
            {!state.loading && (
                <div className={styles.container}>
                    <UserMessage
                        {...defaultProps}
                        hidden={state.selectedPeriod.isConfirmed}
                        text={format(resource('TIMESHEET.PERIOD_HOURS_SUMMARY_TEXT'), getDurationDisplay(state.selectedPeriod.totalDuration))}
                        iconName='ReminderTime' />
                    <UserMessage
                        {...defaultProps}
                        hidden={state.selectedPeriod.unmatchedDuration === 0 || state.selectedPeriod.isConfirmed}
                        text={format(resource('TIMESHEET.HOURS_NOT_MATCHED_TEXT'), getDurationDisplay(state.selectedPeriod.unmatchedDuration))}
                        type={MessageBarType.warning}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={state.selectedPeriod.unmatchedDuration > 0 || state.selectedPeriod.isConfirmed}
                        text={resource('TIMESHEET.ALL_HOURS_MATCHED_TEXT')}
                        type={MessageBarType.success}
                        iconName='BufferTimeBoth' />
                    <UserMessage
                        {...defaultProps}
                        hidden={!state.selectedPeriod.isConfirmed}
                        text={format(resource('TIMESHEET.PERIOD_CONFIRMED_TEXT'), getDurationDisplay(state.selectedPeriod.matchedDuration))}
                        type={MessageBarType.success}
                        iconName='CheckMark' />
                    <UserMessage
                        {...defaultProps}
                        hidden={state.selectedPeriod.ignoredEvents.length === 0 || state.selectedPeriod.isConfirmed}
                        iconName='DependencyRemove'>
                        <p>
                            <span>{format(resource('TIMESHEET.IGNORED_EVENTS_TEXT'), state.selectedPeriod.ignoredEvents.length)}</span>
                            <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{resource('TIMESHEET.UNDO_IGNORE_LINK_TEXT')}</a>
                        </p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={state.selectedPeriod.errors.length === 0}
                        type={MessageBarType.severeWarning}
                        iconName='ErrorBadge'>
                        <p>{format(resource('TIMESHEET.UNRESOLVER_ERRORS_TEXT'), state.selectedPeriod.errors.length)}</p>
                    </UserMessage>
                    <UserMessage
                        {...defaultProps}
                        hidden={state.periods.length < 2}
                        iconName='SplitObject'>
                        <p>{resource('TIMESHEET.SPLIT_WEEK_TEXT')}</p>
                    </UserMessage>
                </div>
            )}
        </div >
    );
}