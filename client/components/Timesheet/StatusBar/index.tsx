
import { UserMessage } from 'components/UserMessage';
import { getDurationDisplay } from 'helpers';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import { IStatusBarProps } from './IStatusBarProps';

export const StatusBar = (props: IStatusBarProps) => {
    let totalDuration = props.events.reduce((sum, event) => sum += event.durationMinutes, 0);
    let matchedDuration = props.events.filter(event => !!event.project).reduce((sum, event) => sum += event.durationMinutes, 0);

    return (
        <div className='c-eventview-statusbar' style={{ marginTop: 10, marginLeft: -10, marginRight: -10 }}>
            <Shimmer isDataLoaded={!props.loading} />
            <Shimmer isDataLoaded={!props.loading} />
            {!props.loading && (
                <div className="container">
                    <div className="row">
                        <div className="col-sm"
                            hidden={props.isConfirmed}>
                            <UserMessage text={`You have a total of ${getDurationDisplay(totalDuration)} this week`} iconName='ReminderTime' />
                        </div>
                        <div className="col-sm" hidden={totalDuration - matchedDuration === 0 || props.isConfirmed}>
                            <UserMessage
                                text={`You've **${getDurationDisplay(totalDuration - matchedDuration)}** that are not matched.`}
                                type={MessageBarType.warning}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className="col-sm" hidden={totalDuration - matchedDuration > 0 || props.isConfirmed}>
                            <UserMessage
                                text='All your hours are matched. Are you ready to confirm the week?'
                                type={MessageBarType.success}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className="col-sm" hidden={!props.isConfirmed}>
                            <UserMessage
                                text={`The week is confirmed with ${getDurationDisplay(matchedDuration)}. Click **Unconfirm week** if you want to do some adjustments.`}
                                type={MessageBarType.success}
                                iconName='CheckMark' />
                        </div>
                        <div className="col-sm" hidden={props.ignoredEvents.length === 0 || props.isConfirmed}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='StatusCircleErrorX'>
                                <p>You have {props.ignoredEvents.length} ignored event(s). <a href="#" onClick={props.onClearIgnores}>Click to undo</a>.</p>
                            </UserMessage>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}