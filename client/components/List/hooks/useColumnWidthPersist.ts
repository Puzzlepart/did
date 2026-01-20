import { TableColumnSizingOptions } from '@fluentui/react-components'
import { IListColumn } from '../types'
import { useBrowserStorage } from 'hooks'
import { useCallback, useMemo } from 'react'

type PersistedColumnWidths = Record<string, number>

/**
 * Custom hook to persist column widths in localStorage and generate
 * columnSizingOptions for Fluent UI DataGrid.
 *
 * @param columns - The list of columns
 * @param persistKey - Optional localStorage key for persisting widths
 * @returns An object containing:
 * - `columnSizingOptions`: Options object for DataGrid columnSizingOptions prop
 * - `handleColumnResize`: Callback for DataGrid onColumnResize prop
 */
export function useColumnWidthPersist(
  columns: IListColumn[],
  persistKey?: string
) {
  const [persistedWidths, , , setPersistedWidths] =
    useBrowserStorage<PersistedColumnWidths>({
      key: persistKey ? `${persistKey}_column_widths` : '',
      initialValue: {}
    })

  const columnSizingOptions = useMemo<TableColumnSizingOptions>(() => {
    return columns.reduce<TableColumnSizingOptions>((acc, col) => {
      const minWidth = col.minWidth ?? 50
      const defaultWidth = col.defaultWidth ?? col.minWidth ?? 100
      const persistedWidth = persistKey ? persistedWidths?.[col.key] : undefined

      return {
        ...acc,
        [col.key]: {
          minWidth,
          defaultWidth,
          idealWidth: persistedWidth ?? col.idealWidth ?? defaultWidth
        }
      }
    }, {})
  }, [columns, persistKey, persistedWidths])

  const handleColumnResize = useCallback(
    (
      _e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      data: { columnId: string; width: number }
    ) => {
      if (!persistKey) return

      setPersistedWidths({
        ...persistedWidths,
        [data.columnId]: data.width
      })
    },
    [persistKey, persistedWidths, setPersistedWidths]
  )

  return { columnSizingOptions, handleColumnResize } as const
}
