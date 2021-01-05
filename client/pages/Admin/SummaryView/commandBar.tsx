import { DateObject, default as DateUtils } from 'DateUtils'
import { TFunction } from 'i18next'
import { DatePicker, DateRangeType, DayOfWeek, FirstWeekOfYear, IContextualMenuItem, IDatePickerProps } from 'office-ui-fabric'
import React from 'react'
import * as excelUtils from 'utils/exportExcel'
import { ISummaryViewContext } from './context'
import styles from './SummaryView.module.scss'

const datePickerProps = (t: TFunction): IDatePickerProps => ({
  borderless: true,
  showWeekNumbers: true,
  showGoToToday: false,
  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstFourDayWeek,
  strings: t('common.calendarStrings', { returnObjects: true }) as any,
  calendarProps: {
    strings: t('common.calendarStrings', { returnObjects: true }) as any,
    dateRangeType: DateRangeType.Week
  }
})

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
        iconProps: { iconName: 'View' },
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
        name: DateUtils.getTimespanString(context.range.from, context.range.to),
        iconProps: { iconName: 'DateTime' },
        disabled: context.loading,
        subMenuProps: {
          items: [
            {
              key: 'DATE_RANGE_FROM',
              onRender: () => (
                <div style={{ padding: 10 }}>
                  <DatePicker
                    {...datePickerProps(context.t)}
                    label={context.t('common.fromDateLabel')}
                    value={context.range.from.jsDate}
                    onSelectDate={date => context.dispatch({
                      type: 'SET_RANGE',
                      payload: { from: new DateObject(date).startOfWeek },
                    })} />
                </div>
              )
            },
            {
              key: 'DATE_RANGE_TO',
              onRender: () => (
                <div style={{ padding: 10 }}>
                  <DatePicker
                    {...datePickerProps(context.t)}
                    label={context.t('common.toDateLabel')}
                    minDate={context.range.from.add('2w').startOfWeek.jsDate}
                    value={context.range.to.jsDate}
                    onSelectDate={date => context.dispatch({
                      type: 'SET_RANGE',
                      payload: { to: new DateObject(date).endOfWeek },
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
