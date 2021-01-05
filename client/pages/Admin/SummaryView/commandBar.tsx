import { DateObject } from 'DateUtils'
import { DatePicker, DateRangeType, DayOfWeek, FirstWeekOfYear, IContextualMenuItem } from 'office-ui-fabric'
import React from 'react'
import * as excelUtils from 'utils/exportExcel'
import { ISummaryViewContext } from './context'
import styles from './SummaryView.module.scss'

/**
 * Command bar items
 *
 * @param {ISummaryViewContext} context Summary view context
 */
export const commandBar = (context: ISummaryViewContext) => {
  return {
    items: [
      {
        ...context.type,
        key: 'VIEW_TYPE',
        disabled: context.loading,
        subMenuProps: {
          items: context.types.map((type) => ({
            ...type,
            canCheck: true,
            checked: context.type.key === type.key,
            onClick: () => context.dispatch({ type: 'CHANGE_TYPE', payload: type })
          }))
        },
        className: styles.viewTypeSelector
      },
      {
        key: 'DATE_RANGE',
        name: 'Range',
        subMenuProps: {
          items: [
            {
              key: 'DATE_RANGE_FROM',
              onRender: () => (
                <div style={{ padding: 10 }}>
                  <DatePicker
                    label='From'
                    borderless={true}
                    showWeekNumbers={true}
                    showGoToToday={false}
                    firstDayOfWeek={DayOfWeek.Monday}
                    firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
                    strings={context.t('common.calendarStrings', { returnObjects: true }) as any}
                    calendarProps={{
                      strings: context.t('common.calendarStrings', { returnObjects: true }) as any,
                      dateRangeType: DateRangeType.Week
                    }}
                    value={context.range.from.jsDate}
                    onSelectDate={date => context.dispatch({
                      type: 'SET_RANGE',
                      payload: { from: new DateObject(date) },
                    })} />
                </div>
              )
            },
            {
              key: 'DATE_RANGE_TO',
              onRender: () => (
                <div style={{ padding: 10 }}>
                  <DatePicker
                    label='To'
                    borderless={true}
                    showWeekNumbers={true}
                    showGoToToday={false}
                    firstDayOfWeek={DayOfWeek.Monday}
                    firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
                    strings={context.t('common.calendarStrings', { returnObjects: true }) as any}
                    calendarProps={{
                      strings: context.t('common.calendarStrings', { returnObjects: true }) as any,
                      dateRangeType: DateRangeType.Week
                    }}
                    minDate={context.range.from.add('2w').startOfWeek.jsDate}
                    value={context.range.to.jsDate}
                    onSelectDate={date => context.dispatch({
                      type: 'SET_RANGE',
                      payload: { to: new DateObject(date) },
                    })} />
                </div>
              )
            }
          ]
        }
      }
    ] as IContextualMenuItem[],
    farItems: [
      {
        key: 'EXPORT_TO_EXCEL',
        text: context.t('common.exportCurrentView'),
        iconProps: { iconName: 'ExcelDocument' },
        disabled: context.loading,
        onClick: () => {
          excelUtils.exportExcel(context.rows, {
            columns: context.columns,
            fileName: `Summary-${new Date().toDateString().split(' ').join('-')}.xlsx`
          })
        }
      }
    ]
  }
}
