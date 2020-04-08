
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

export const StatusBar = ({ loading, isConfirmed, events, ignoredEvents, onClearIgnores, errors }: IStatusBarProps) => {
    let totalDuration = getTotalDuration(events);
    let matchedDuration = getMatchedDuration(events);

    return (
        <div className='c-Timesheet-statusbar' style={{ marginTop: 10, marginLeft: -10, marginRight: -10 }}>
            <Shimmer isDataLoaded={!loading} />
            <Shimmer isDataLoaded={!loading} />
            {!loading && (
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm'
                            hidden={isConfirmed}>
                            <UserMessage text={format(resource('timesheet.periodHoursSummaryText'), getDurationDisplay(totalDuration))} iconName='ReminderTime' />
                        </div>
                        <div className='col-sm' hidden={totalDuration - matchedDuration === 0 || isConfirmed}>
                            <UserMessage
                                text={format(resource('timesheet.hoursNotMatchedText'), getDurationDisplay(totalDuration - matchedDuration))}
                                type={MessageBarType.warning}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={totalDuration - matchedDuration > 0 || isConfirmed}>
                            <UserMessage
                                text={resource('allHoursMatchedText')}
                                type={MessageBarType.success}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={!isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.PERIOD_CONFIRMED_TEXT'), getDurationDisplay(matchedDuration))}
                                type={MessageBarType.success}
                                iconName='CheckMark' />
                        </div>
                        <div className='col-sm' hidden={ignoredEvents.length === 0 || isConfirmed}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='DependencyRemove'>
                                <p>{format(resource('timesheet.ignoredEventsText'), ignoredEvents.length)} <a href='#' onClick={onClearIgnores}>{resource('timesheet.undoIgnoreLinkText')}</a></p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={errors.length === 0}>
                            <UserMessage
                                type={MessageBarType.severeWarning}
                                iconName='ErrorBadge'>
                                <p>{format(resource('timesheet.unresolvedErrorsText'), errors.length)}</p>
                            </UserMessage>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}