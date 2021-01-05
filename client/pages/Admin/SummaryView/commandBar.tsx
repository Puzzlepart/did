import { IContextualMenuItem } from 'office-ui-fabric'
import React from 'react'
import * as excelUtils from 'utils/exportExcel'
import { ISummaryViewContext } from './context'
import { DateRangePicker } from './DateRangePicker'
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
        name: '',
        onRender: () => <DateRangePicker />
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
