import format from 'string-format'
import { useTranslation } from 'react-i18next'
import { exportExcel } from 'utils/exportExcel'
import { useListContext } from '../../context'
import { ListMenuItem } from './ListMenuItem'
import { ListCommandBarItem } from '../../types'

/**
 * Returns an object containing a command bar item and a list menu item for exporting a list to Excel.
 *
 * @returns An object containing a command bar item and a list menu item.
 */
export function useExcelExportCommand() {
  const { t } = useTranslation()
  const context = useListContext()

  if (!context.props.exportFileName) {
    return {
      commandBarItem: undefined,
      menuItem: undefined
    }
  }

  const commandBarItem: ListCommandBarItem = {
    key: 'EXPORT_TO_EXCEL',
    text: t('reports.exportToExcel'),
    onClick: () => {
      const fileName = format(
        context.props.exportFileName,
        new Date().toDateString().split(' ').join('-')
      )
      exportExcel(context.state.items, {
        columns: context.props.columns,
        fileName
      })
    },
    disabled: context.props.enableShimmer,
    iconName: 'ExcelDocument'
  }
  const menuItem = new ListMenuItem(commandBarItem.text)
    .withIcon('ExcelLogoInverse')
    .setOnClick(commandBarItem.onClick)
    .setDisabled(commandBarItem.disabled)
  return { commandBarItem, menuItem }
}
