/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, DayOfWeek, FirstWeekOfYear } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { SummaryViewContext } from '../context'
import { IDateRangePickerProps } from './types'
import styles from './DateRangePicker.module.scss'
import { DateObject } from 'DateUtils'

export const DateRangePicker = (props: IDateRangePickerProps) => {
    const context = useContext(SummaryViewContext)
    return (
        <div className={styles.root}>
            <DatePicker
                borderless={true}
                showWeekNumbers={true}
                firstDayOfWeek={DayOfWeek.Monday}
                strings={context.t('common.calendarStrings', { returnObjects: true }) as any}
                firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
                value={context.range.from.jsDate}
                onSelectDate={date => context.dispatch({
                    type: 'SET_RANGE',
                    payload: { from: new DateObject(date) },
                })} />
            <DatePicker
                borderless={true}
                showWeekNumbers={true}
                firstDayOfWeek={DayOfWeek.Monday}
                strings={context.t('common.calendarStrings', { returnObjects: true }) as any}
                firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
                value={context.range.to.jsDate}
                onSelectDate={date => context.dispatch({
                    type: 'SET_RANGE',
                    payload: { to: new DateObject(date) },
                })} />
        </div>
    )
}

export * from './types'
