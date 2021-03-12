import * as excelUtils from 'utils/exportExcel'
import { ISummaryViewContext } from './context'

/**
 * Command bar items
 *
 * @param context - Summary view context
 */
export const commandBar = (context: ISummaryViewContext) => {
  return {
    items: [],
    farItems: [
      {
        key: 'EXPORT_TO_EXCEL',
        text: context.t('common.exportCurrentView'),
        iconProps: { iconName: 'ExcelDocument' },
        disabled: true,
        onClick: () => {
          excelUtils.exportExcel(context.rows, {
            columns: context.columns,
            fileName: `Summary-${new Date()
              .toDateString()
              .split(' ')
              .join('-')}.xlsx`
          })
        }
      }
    ]
  }
}
