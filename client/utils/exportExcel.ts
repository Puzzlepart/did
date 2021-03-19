import { IListColumn } from 'components/List/types'
import { DateObject } from 'DateUtils'
import { getValue as get } from 'helpers'
import { humanize } from 'underscore.string'
import { loadScripts } from './loadScripts'

export interface IExcelExportOptions {
  fileName: string
  columns?: IListColumn[]
  skip?: string[]
}

export type ExcelColumnType = 'date' | null

/**
 * Coverts a Javascript string to a
 * unsigned 8 byte int ArrayBuffer
 *
 * @see https://gist.github.com/gabemeola/c32b80d9302b30b577118c39f98e00b2
 *
 * @param binaryString - Binary String
 */
export default function stringToArrayBuffer(binaryString: string) {
  const { length } = binaryString
  const buffer = new Uint8Array(length)

  for (let index = 0; index < length; index++) {
    buffer[index] = binaryString.charCodeAt(index)
  }

  return buffer
}

/**
 * Export to Excel
 *
 * @param items - An array of items
 * @param options - Options
 *
 * @returns The generated blob
 */
export async function exportExcel(
  items: any[],
  options: IExcelExportOptions
): Promise<Blob> {
  const { xlsx, saveAs } = await loadScripts<{ xlsx: any; saveAs: any }>(
    ['FileSaver.js/1.3.8/FileSaver.min.js', 'xlsx/0.14.5/xlsx.full.min.js'],
    'https://cdnjs.cloudflare.com/ajax/libs/',
    { xlsx: 'XLSX', saveAs: 'saveAs' }
  )

  if (!options.columns) {
    options.columns = Object.keys(items[0])
      .filter((f) => !(options.skip || []).includes(f))
      .map((fieldName) => ({
        key: fieldName,
        fieldName,
        name: humanize(fieldName),
        minWidth: 0
      }))
  }

  const columns = options.columns.filter(
    (column_) => !column_?.data?.hiddenFromExport
  )

  const sheets = [
    {
      name: 'Sheet 1',
      data: [
        columns.map((column_) => column_.name),
        ...items.map((item) =>
          columns.map((col) => {
            const fieldValue = get<string>(item, col.fieldName)
            switch (col?.data?.excelColFormat) {
              case 'date':
                return {
                  v: new DateObject(fieldValue).format('YYYY-MM-DD HH:mm'),
                  t: 'd'
                }
              default:
                return fieldValue
            }
          })
        )
      ]
    }
  ]
  const workBook = xlsx.utils.book_new()
  for (const s of sheets) {
    const sheet = xlsx.utils.aoa_to_sheet(s.data)
    xlsx.utils.book_append_sheet(workBook, sheet, s.name)
  }
  const wbout = xlsx.write(workBook, { type: 'binary', bookType: 'xlsx' })
  const blob = new Blob([stringToArrayBuffer(wbout)], {
    type: 'application/octet-stream'
  })
  saveAs(blob, options.fileName)
  return blob
}
