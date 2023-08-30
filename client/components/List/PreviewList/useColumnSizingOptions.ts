import { TableColumnSizingOptions } from '@fluentui/react-components'
import { useMemo } from 'react'
import { IListProps } from '../types'

/**
 * Returns an object with sizing options for each column in the provided list of columns.
 *
 * @param columns - An array of column objects.
 *
 * @returns An object with sizing options for each column.
 */
export function useColumnSizingOptions(columns: IListProps['columns']) {
    return useMemo<TableColumnSizingOptions>(() => {
        return columns.reduce((columnSizingOptions, column) => {
            columnSizingOptions[column.key] = {
                minWidth: column.minWidth,
                defaultWidth: column.minWidth,
                idealWidth: column.maxWidth,
            }
            return columnSizingOptions
        }, {} as TableColumnSizingOptions)
    }, [columns])
}
