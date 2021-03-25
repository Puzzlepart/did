import $date from 'DateUtils'
import { IColumn } from '@fluentui/react-react'

/**
 * Generate total row
 *
 * @param events - Events
 * @param columns - Columns
 * @param label - Label
 */
export function generateTotalRow(
  events: any[],
  columns: IColumn[],
  label: string
) {
  return [...columns].splice(1, columns.length - 2).reduce(
    (object, col) => {
      const sum = [...events]
        .filter(
          (event) =>
            $date.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
            col.fieldName
        )
        .reduce((sum, event) => (sum += event.duration), 0)
      object[col.fieldName] = sum
      object.sum += sum
      return object
    },
    { label, sum: 0 }
  )
}
