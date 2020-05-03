
import { UserMessage } from 'common/components/UserMessage';
import { getDurationDisplay } from 'helpers';
import resource from 'i18n';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import * as format from 'string-format';
import { IStatusBarProps } from './IStatusBarProps';
import { TimesheetContext } from '../';

/**
 * @category Timesheet
 */
export const StatusBar = ({ dispatch }: IStatusBarProps) => {
    const { loading, periods, selectedPeriod } = React.useContext(TimesheetContext);
    return (
        <div className='c-Timesheet-statusbar' style={{ marginTop: 10, marginLeft: -10, marginRight: -10 }}>
            <Shimmer isDataLoaded={!loading} />
            <Shimmer isDataLoaded={!loading} />
            {!loading && (
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm'
                            hidden={selectedPeriod.isConfirmed}>
                            <UserMessage text={format(resource('TIMESHEET.PERIOD_HOURS_SUMMARY_TEXT'), getDurationDisplay(selectedPeriod.totalDuration))} iconName='ReminderTime' />
                        </div>
                        <div className='col-sm' hidden={selectedPeriod.unmatchedDuration === 0 || selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.HOURS_NOT_MATCHED_TEXT'), getDurationDisplay(selectedPeriod.unmatchedDuration))}
                                type={MessageBarType.warning}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={selectedPeriod.unmatchedDuration > 0 || selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={resource('TIMESHEET.ALL_HOURS_MATCHED_TEXT')}
                                type={MessageBarType.success}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={!selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.PERIOD_CONFIRMED_TEXT'), getDurationDisplay(selectedPeriod.matchedDuration))}
                                type={MessageBarType.success}
                                iconName='CheckMark' />
                        </div>
                        <div className='col-sm' hidden={selectedPeriod.ignoredEvents.length === 0 || selectedPeriod.isConfirmed}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='DependencyRemove'>
                                <p>{format(resource('TIMESHEET.IGNORED_EVENTS_TEXT'), selectedPeriod.ignoredEvents.length)} <a href='#' onClick={() => dispatch({ type: 'CLEAR_IGNORES' })}>{resource('TIMESHEET.UNDO_IGNORE_LINK_TEXT')}</a></p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={selectedPeriod.errors.length === 0}>
                            <UserMessage
                                type={MessageBarType.severeWarning}
                                iconName='ErrorBadge'>
                                <p>{format(resource('TIMESHEET.UNRESOLVER_ERRORS_TEXT'), selectedPeriod.errors.length)}</p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={periods.length < 2}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='SplitObject'>
                                <p>{resource('TIMESHEET.SPLIT_WEEK_TEXT')}</p>
                            </UserMessage>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}