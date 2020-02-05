import { getTimespanString, getWeek, getYear, startOfWeek, endOfWeek } from 'helpers';
import { Calendar, DateRangeType, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import { ACTIONBAR_ICON_PROPS } from '../ACTIONBAR_ICON_PROPS';
import { DAY_PICKER_STRINGS } from './DAY_PICKER_STRINGS';
import { IWeekPickerProps } from './IWeekPickerProps';

export const WeekPicker = ({ period, onChangeWeek }: IWeekPickerProps) => {
    let [calendar, setCalendar] = useState(null);

    return (
        <>
            <div>
                <TextField
                    onClick={event => setCalendar(event.currentTarget)}
                    value={getTimespanString(period.startDateTime, period.endDateTime)}
                    styles={{ field: { color: 'rgb(120, 120, 120)', cursor: 'pointer' }, root: { width: 280, marginTop: 6 } }}
                    readOnly
                    borderless
                    iconProps={{ iconName: 'ChevronDown', ...ACTIONBAR_ICON_PROPS }} />
            </div>
            {calendar && (
                <Callout
                    isBeakVisible={false}
                    className='c-eventview-weekpicker--callout'
                    gapSpace={5}
                    doNotLayer={false}
                    target={calendar}
                    directionalHint={DirectionalHint.bottomLeftEdge}
                    onDismiss={_ => setCalendar(null)}
                    setInitialFocus={true}>
                    <FocusTrapZone isClickableOutsideFocusTrap={true}>
                        <Calendar
                            onSelectDate={date => {
                                onChangeWeek({ year: getYear(date.toISOString()), week: getWeek(date.toISOString()) });
                                setCalendar(null);
                            }}
                            firstDayOfWeek={DayOfWeek.Monday}
                            strings={DAY_PICKER_STRINGS}
                            showGoToToday={false}
                            showWeekNumbers={true}
                            dateRangeType={DateRangeType.Week}
                            autoNavigateOnSelection={true}
                            value={startOfWeek(period.week).toDate()} />
                    </FocusTrapZone>
                </Callout>
            )}
        </>
    );
}