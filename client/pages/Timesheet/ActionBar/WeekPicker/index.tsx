import { Calendar, DateRangeType, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { TimesheetContext } from 'pages/Timesheet';
import { TimesheetScope } from 'pages/Timesheet/TimesheetScope';
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ACTIONBAR_ICON_PROPS } from '../ACTIONBAR_ICON_PROPS';
import { CALENDAR_STRINGS } from './CALENDAR_STRINGS';
import styles from './WeekPicker.module.scss';

/**
 * @category Timesheet
 */
export const WeekPicker = () => {
    const { scope } = React.useContext(TimesheetContext);
    const history = useHistory();
    const [calendar, setCalendar] = useState(null);

    return (
        <>
            <div>
                <TextField
                    className={styles.root}
                    onClick={event => setCalendar(event.currentTarget)}
                    value={scope.timespan}
                    styles={{ field: { color: 'rgb(120, 120, 120)', cursor: 'pointer' }, root: { width: 280, marginTop: 6 } }}
                    readOnly
                    borderless
                    iconProps={{ iconName: 'ChevronDown', ...ACTIONBAR_ICON_PROPS }} />
            </div>
            {calendar && (
                <Callout
                    isBeakVisible={false}
                    className={styles.callout}
                    gapSpace={5}
                    doNotLayer={false}
                    target={calendar}
                    directionalHint={DirectionalHint.bottomLeftEdge}
                    onDismiss={() => setCalendar(null)}
                    setInitialFocus={true}>
                    <FocusTrapZone isClickableOutsideFocusTrap={true}>
                        <Calendar
                            onSelectDate={date => {
                                const { iso } = new TimesheetScope(date)
                                history.push(`/timesheet/${iso.startDateTime}`);
                                setCalendar(null);
                            }}
                            firstDayOfWeek={DayOfWeek.Monday}
                            strings={CALENDAR_STRINGS}
                            showGoToToday={false}
                            showWeekNumbers={true}
                            dateRangeType={DateRangeType.Week}
                            autoNavigateOnSelection={true}
                            value={scope.date.startDateTime} />
                    </FocusTrapZone>
                </Callout>
            )}
        </>
    );
}