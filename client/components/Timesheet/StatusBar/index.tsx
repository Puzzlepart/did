
import { UserMessage } from 'components/UserMessage';
import { getDurationDisplay } from 'helpers';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import { IStatusBarProps } from './IStatusBarProps';
import { ITimeEntry } from 'interfaces';

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
                <div className="container">
                    <div className="row">
                        <div className="col-sm"
                            hidden={isConfirmed}>
                            <UserMessage text={`You have a total of **${getDurationDisplay(totalDuration)}** this week`} iconName='ReminderTime' />
                        </div>
                        <div className="col-sm" hidden={totalDuration - matchedDuration === 0 || isConfirmed}>
                            <UserMessage
                                text={`You have **${getDurationDisplay(totalDuration - matchedDuration)}** that are not matched.`}
                                type={MessageBarType.warning}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className="col-sm" hidden={totalDuration - matchedDuration > 0 || isConfirmed}>
                            <UserMessage
                                text='All your hours are matched. Are you ready to confirm the week?'
                                type={MessageBarType.success}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className="col-sm" hidden={!isConfirmed}>
                            <UserMessage
                                text={`The week is confirmed with ${getDurationDisplay(matchedDuration)}. Click **Unconfirm week** if you want to do some adjustments.`}
                                type={MessageBarType.success}
                                iconName='CheckMark' />
                        </div>
                        <div className="col-sm" hidden={ignoredEvents.length === 0 || isConfirmed}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='DependencyRemove'>
                                <p>You have {ignoredEvents.length} ignored event(s). <a href="#" onClick={onClearIgnores}>Click to undo</a></p>
                            </UserMessage>
                        </div>
                        <div className="col-sm" hidden={errors.length === 0}>
                            <UserMessage
                                type={MessageBarType.severeWarning}
                                iconName='ErrorBadge'>
                                <p>You have {errors.length} unresolved errors. You need to resolve them before confirming the week.</p>
                            </UserMessage>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}