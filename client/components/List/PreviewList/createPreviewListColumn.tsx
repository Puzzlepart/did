import {
  createTableColumn,
  TableCellLayout,
  TableHeaderCell,
  Text,
  Tooltip
} from '@fluentui/react-components'
import get from 'get-value'
import React from 'react'
import s from 'underscore.string'
import { IListColumn } from '../types'

/**
 * Creates a table column from a `IListColumn`.
 *
 * @param column - The column to create a table column for.
 * @param cellPadding - The padding for the table cells (default: 6)
 *
 * @returns The created table column.
 */
export function createPreviewListColumn(column: IListColumn, cellPadding = 6) {
  return createTableColumn<any>({
    columnId: column.fieldName,
    renderHeaderCell: () => (
      <TableHeaderCell>
        {column.name}
      </TableHeaderCell>
    ),
    renderCell: (item) => {
      if (column.onRender) {
        return column.onRender(item)
      }
      const columnValue = get(item, column.fieldName)
      if (!columnValue) return null
      if (column.isMultiline) {
        return (
          <TableCellLayout style={{ padding: cellPadding }}>
            <Tooltip
              content={<div style={{ padding: 10 }}>{columnValue}</div>}
              relationship='description'
            >
              <Text>{s.truncate(columnValue, 100, '...')}</Text>
            </Tooltip>
          </TableCellLayout>
        )
      }
      return (
        <TableCellLayout style={{ padding: cellPadding }}>
          {columnValue}
        </TableCellLayout>
      )
    },
    compare: (a, b) => (a[column.fieldName] > b[column.fieldName] ? 1 : -1)
  })
}
