import { IContextualMenuItem, DatePicker, DayOfWeek, FirstWeekOfYear } from 'office-ui-fabric'
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
        key: 'RANGE',
        name: '',
        onRender: () => (
          <>
            <DatePicker
              borderless={true}
              showWeekNumbers={true}
              firstDayOfWeek={DayOfWeek.Monday}
              strings={context.t('common.calendarStrings', { returnObjects: true }) as any}
              firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
              value={new Date('10.22.2020')}
              onSelectDate={date => context.dispatch({
                type: 'SET_RANGE',
                payload: { start: date },
              })} />
            <DatePicker
              borderless={true}
              showWeekNumbers={true}
              firstDayOfWeek={DayOfWeek.Monday}
              strings={context.t('common.calendarStrings', { returnObjects: true }) as any}
              firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
              value={new Date()}
              onSelectDate={date => context.dispatch({
                type: 'SET_RANGE',
                payload: { end: date },
              })}/>
          </>
        )
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
