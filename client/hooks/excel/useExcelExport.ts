import { format, IColumn } from '@fluentui/react'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { exportExcel } from 'utils/exportExcel'

interface IUseExcelExportOptions {
  items: any[]
  fileName: string
  columns: IColumn[] | ((t: TFunction) => IColumn[])
  callback?: (blob: Blob) => void
}

/**
 * Excel export hook
 *
 * @category React Hook
 */
export function useExcelExport({
  items,
  fileName,
  columns,
  callback
}: IUseExcelExportOptions) {
  const { t } = useTranslation()

  const onExport = async () => {
    const blob = await exportExcel(items, {
      columns: _.isArray(columns) ? columns : columns(t),
      fileName: format(fileName, new Date().toDateString().split(' ').join('-'))
    })
    if (callback) {
      callback(blob)
    }
  }

  return { onExport }
}
