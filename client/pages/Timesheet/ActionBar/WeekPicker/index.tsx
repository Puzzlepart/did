import { Calendar, DateRangeType, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar'
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout'
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu'
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { TimesheetContext } from 'pages/Timesheet'
import  React,{useContext} from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ACTIONBAR_ICON_PROPS } from '../ACTIONBAR_ICON_PROPS'
import styles from './WeekPicker.module.scss'

export const WeekPicker = () => {
    const { t } = useTranslation()
    const { scope, dispatch } = useContext(TimesheetContext)
    const [calendar, setCalendar] = useState(null)

    return (
        <>
            <div>
                <TextField
                    className={styles.root}
                    onClick={event => setCalendar(event.currentTarget)}
                    value={scope.timespan}
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
                                dispatch({ type: 'MOVE_SCOPE', payload: date.toISOString() })
                                setCalendar(null)
                            }}
                            firstDayOfWeek={DayOfWeek.Monday}
                            strings={t('common.calendarStrings', { returnObjects: true }) as any}
                            showGoToToday={false}
                            showWeekNumbers={true}
                            dateRangeType={DateRangeType.Week}
                            autoNavigateOnSelection={true}
                            value={scope.startDateTime.toDate()} />
                    </FocusTrapZone>
                </Callout>
            )}
        </>
    )
}

export default {
    key: 'WEEK_PICKER',
    itemType: ContextualMenuItemType.Normal,
    onRender: () => <WeekPicker />,
} as IContextualMenuItem