
import { UserMessage } from 'components/UserMessage';
import { getDurationDisplay } from 'helpers';
import resource from 'i18n';
import { ITimeEntry } from 'interfaces';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import * as format from 'string-format';
import { IStatusBarProps } from './IStatusBarProps';

/**
 * Get total duration
 * 
 * @param {ITimeEntry[]} events Events
 */
function getTotalDuration(events: ITimeEntry[]) {
    return events.reduce((sum, event) => sum += event.durationMinutes, 0);
}

/**
 * Get matched duration
 * 
 * @param {ITimeEntry[]} events Events
 */
function getMatchedDuration(events: ITimeEntry[]) {
    return events.filter(event => !!event.project).reduce((sum, event) => sum += event.durationMinutes, 0);
}

export const StatusBar = ({ timesheet, ignoredEvents, onClearIgnores }: IStatusBarProps) => {
    let totalDuration = getTotalDuration(timesheet.selectedPeriod.events);
    let matchedDuration = getMatchedDuration(timesheet.selectedPeriod.events);

    return (
        <div className='c-Timesheet-statusbar' style={{ marginTop: 10, marginLeft: -10, marginRight: -10 }}>
            <Shimmer isDataLoaded={!timesheet.loading} />
            <Shimmer isDataLoaded={!timesheet.loading} />
            {!timesheet.loading && (
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm'
                            hidden={timesheet.selectedPeriod.isConfirmed}>
                            <UserMessage text={format(resource('TIMESHEET.PERIOD_HOURS_SUMMARY_TEXT'), getDurationDisplay(totalDuration))} iconName='ReminderTime' />
                        </div>
                        <div className='col-sm' hidden={totalDuration - matchedDuration === 0 || timesheet.selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.HOURS_NOT_MATCHED_TEXT'), getDurationDisplay(totalDuration - matchedDuration))}
                                type={MessageBarType.warning}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={totalDuration - matchedDuration > 0 || timesheet.selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={resource('ALL_HOURS_MATCHED_TEXT')}
                                type={MessageBarType.success}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={!timesheet.selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.PERIOD_CONFIRMED_TEXT'), getDurationDisplay(matchedDuration))}
                                type={MessageBarType.success}
                                iconName='CheckMark' />
                        </div>
                        <div className='col-sm' hidden={ignoredEvents.length === 0 || timesheet.selectedPeriod.isConfirmed}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='DependencyRemove'>
                                <p>{format(resource('TIMESHEET.IGNORED_EVENTS_TEXT'), ignoredEvents.length)} <a href='#' onClick={onClearIgnores}>{resource('TIMESHEET.UNDO_IGNORE_LINK_TEXT')}</a></p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={timesheet.selectedPeriod.errors.length === 0}>
                            <UserMessage
                                type={MessageBarType.severeWarning}
                                iconName='ErrorBadge'>
                                <p>{format(resource('TIMESHEET.UNRESOLVER_ERRORS_TEXT'), timesheet.selectedPeriod.errors.length)}</p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={timesheet.periods.length < 2}>
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