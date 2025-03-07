import { IListColumn } from 'components/List/types'
import { DateObject } from 'DateUtils'
import get from 'get-value'
import s from 'underscore.string'
import { loadScripts } from './loadScripts'
import $date from 'DateUtils'

type XLSX = {
  utils: {
    aoa_to_sheet: (data: any[][]) => any
    book_new: () => any
    book_append_sheet: (workBook: any, sheet: any, name: string) => void
  }
  write: (workBook: any, options: any) => string
}
type FileSaver = (blob: Blob, fileName: string) => void

export interface IExcelExportOptions {
  fileName: string
  columns?: IListColumn[]
  skip?: string[]
}

export type ExcelColumnType = 'date' | 'monthName' | null

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
 * Export to Excel with table formatting and filters
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
  const { xlsx, saveAs } = await loadScripts<{ xlsx: XLSX; saveAs: FileSaver }>(
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
        name: s.humanize(fieldName),
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
            const fieldValue = get(item, col.fieldName)
            switch (col?.data?.excelColFormat) {
              case 'date': {
                return {
                  v: new DateObject(fieldValue).format('YYYY-MM-DD HH:mm'),
                  t: 'd'
                }
              }
              case 'monthName': {
                return {
                  v: $date.getMonthNames()[fieldValue - 1]
                }
              }
              default: {
                return fieldValue
              }
            }
          })
        )
      ]
    }
  ]

  const workBook = xlsx.utils.book_new()

  for (const s of sheets) {
    // Convert data to worksheet
    const sheet = xlsx.utils.aoa_to_sheet(s.data)

    // Add autofilter to the sheet
    sheet['!autofilter'] = { ref: sheet['!ref'] }

    // Set column widths (auto-width)
    const colWidths = columns.map(() => ({ wch: 15 }))
    sheet['!cols'] = colWidths

    // Add table formatting
    if (!workBook.Workbook) workBook.Workbook = { Names: [] }

    // Define table range
    const tableRange = sheet['!ref']

    // Add table definition
    workBook.Workbook.Names.push({
      Name: '_xlnm._FilterDatabase',
      Ref: `'${s.name}'!${tableRange}`,
      Hidden: true
    })

    xlsx.utils.book_append_sheet(workBook, sheet, s.name)
  }

  const wbout = xlsx.write(workBook, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
    Props: {
      Author: 'Export'
    }
  })

  const blob = new Blob([stringToArrayBuffer(wbout)], {
    type: 'application/octet-stream'
  })
  saveAs(blob, options.fileName)
  return blob
}
