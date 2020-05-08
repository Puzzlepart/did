import resource from 'i18n';
import { Calendar, DateRangeType, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { TimesheetContext } from 'pages/Timesheet';
import * as React from 'react';
import { useState } from 'react';
import { ACTIONBAR_ICON_PROPS } from '../ACTIONBAR_ICON_PROPS';
import styles from './WeekPicker.module.scss';

/**
 * @category Timesheet
 */
export const WeekPicker = () => {
    const { state, dispatch } = React.useContext(TimesheetContext);
    const [calendar, setCalendar] = useState(null);

    return (
        <>
            <div>
                <TextField
                    className={styles.root}
                    onClick={event => setCalendar(event.currentTarget)}
                    value={state.scope.timespan}
                    styles={{
                        field: {
                            color: 'rgb(120, 120, 120)',
                            cursor: 'pointer'
                        },
                        root: {
                            width: 280,
                            marginTop: 6
                        }
                    }}
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
                                dispatch({ type: 'MOVE_SCOPE', payload: date.toISOString() });
                                setCalendar(null);
                            }}
                            firstDayOfWeek={DayOfWeek.Monday}
                            strings={resource('CALENDAR_STRINGS', true) as any}
                            showGoToToday={false}
                            showWeekNumbers={true}
                            dateRangeType={DateRangeType.Week}
                            autoNavigateOnSelection={true}
                            value={state.scope.date.startDateTime} />
                    </FocusTrapZone>
                </Callout>
            )}
        </>
    );
}