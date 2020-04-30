import { endOfWeek, getTimespanString, startOfWeek } from 'helpers';
import { Calendar, DateRangeType, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import { ACTIONBAR_ICON_PROPS } from '../ACTIONBAR_ICON_PROPS';
import { CALENDAR_STRINGS } from './CALENDAR_STRINGS';
import { IWeekPickerProps } from './IWeekPickerProps';

/**
 * @category Timesheet
 */
export const WeekPicker = ({ scope, onChange }: IWeekPickerProps) => {
    let [calendar, setCalendar] = useState(null);

    return (
        <>
            <div>
                <TextField
                    className='c-Timesheet-weekPicker'
                    onClick={event => setCalendar(event.currentTarget)}
                    value={getTimespanString(scope.startDateTime, scope.endDateTime)}
                    styles={{ field: { color: 'rgb(120, 120, 120)', cursor: 'pointer' }, root: { width: 280, marginTop: 6 } }}
                    readOnly
                    borderless
                    iconProps={{ iconName: 'ChevronDown', ...ACTIONBAR_ICON_PROPS }} />
            </div>
            {calendar && (
                <Callout
                    isBeakVisible={false}
                    className='c-Timesheet-weekpicker--callout'
                    gapSpace={5}
                    doNotLayer={false}
                    target={calendar}
                    directionalHint={DirectionalHint.bottomLeftEdge}
                    onDismiss={_ => setCalendar(null)}
                    setInitialFocus={true}>
                    <FocusTrapZone isClickableOutsideFocusTrap={true}>
                        <Calendar
                            onSelectDate={date => {
                                onChange({ startDateTime: startOfWeek(date), endDateTime: endOfWeek(date) });
                                setCalendar(null);
                            }}
                            firstDayOfWeek={DayOfWeek.Monday}
                            strings={CALENDAR_STRINGS}
                            showGoToToday={false}
                            showWeekNumbers={true}
                            dateRangeType={DateRangeType.Week}
                            autoNavigateOnSelection={true}
                            value={scope.startDateTime.toDate()} />
                    </FocusTrapZone>
                </Callout>
            )}
        </>
    );
}