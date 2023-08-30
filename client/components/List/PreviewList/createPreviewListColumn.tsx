import { createTableColumn } from '@fluentui/react-components'
import { IListColumn } from '../types'


/**
 * Creates a table column from a `IListColumn`.
 * 
 * @param column - The column to create a table column for.
 * 
 * @returns The created table column.
 */
export function createPreviewListColumn(column: IListColumn) {
    return createTableColumn({
        columnId: column.fieldName,
        renderHeaderCell: () => column.name,
        renderCell: (item) => {
            if (column.onRender) {
                return column.onRender(item)
            }
            return item[column.fieldName]
        },
        compare: (a, b) => {
            return a[column.fieldName] > b[column.fieldName] ? 1 : -1
        }
    })
}
