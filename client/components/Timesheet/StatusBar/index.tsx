
import { UserMessage } from 'common/components/UserMessage';
import { getDurationDisplay } from 'helpers';
import resource from 'i18n';
import { ITimeEntry } from 'interfaces';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import * as format from 'string-format';
import { IStatusBarProps } from './IStatusBarProps';

/**
 * @category Timesheet
 */
export const StatusBar = (props: IStatusBarProps) => {
    return (
        <div className='c-Timesheet-statusbar' style={{ marginTop: 10, marginLeft: -10, marginRight: -10 }}>
            <Shimmer isDataLoaded={!props.timesheet.loading} />
            <Shimmer isDataLoaded={!props.timesheet.loading} />
            {!props.timesheet.loading && (
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm'
                            hidden={props.selectedPeriod.isConfirmed}>
                            <UserMessage text={format(resource('TIMESHEET.PERIOD_HOURS_SUMMARY_TEXT'), getDurationDisplay(props.selectedPeriod.totalDuration))} iconName='ReminderTime' />
                        </div>
                        <div className='col-sm' hidden={props.selectedPeriod.unmatchedDuration === 0 || props.selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.HOURS_NOT_MATCHED_TEXT'), getDurationDisplay(props.selectedPeriod.unmatchedDuration))}
                                type={MessageBarType.warning}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={props.selectedPeriod.unmatchedDuration > 0 || props.selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={resource('TIMESHEET.ALL_HOURS_MATCHED_TEXT')}
                                type={MessageBarType.success}
                                iconName='BufferTimeBoth' />
                        </div>
                        <div className='col-sm' hidden={!props.selectedPeriod.isConfirmed}>
                            <UserMessage
                                text={format(resource('TIMESHEET.PERIOD_CONFIRMED_TEXT'), getDurationDisplay(props.selectedPeriod.matchedDuration))}
                                type={MessageBarType.success}
                                iconName='CheckMark' />
                        </div>
                        <div className='col-sm' hidden={props.selectedPeriod.ignoredEvents.length === 0 || props.selectedPeriod.isConfirmed}>
                            <UserMessage
                                type={MessageBarType.info}
                                iconName='DependencyRemove'>
                                <p>{format(resource('TIMESHEET.IGNORED_EVENTS_TEXT'), props.selectedPeriod.ignoredEvents.length)} <a href='#' onClick={props.onClearIgnores}>{resource('TIMESHEET.UNDO_IGNORE_LINK_TEXT')}</a></p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={props.selectedPeriod.errors.length === 0}>
                            <UserMessage
                                type={MessageBarType.severeWarning}
                                iconName='ErrorBadge'>
                                <p>{format(resource('TIMESHEET.UNRESOLVER_ERRORS_TEXT'), props.selectedPeriod.errors.length)}</p>
                            </UserMessage>
                        </div>
                        <div className='col-sm' hidden={props.timesheet.periods.length < 2}>
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