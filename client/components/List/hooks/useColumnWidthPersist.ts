import { TableColumnSizingOptions } from '@fluentui/react-components'
import { IListColumn } from '../types'
import { useBrowserStorage } from 'hooks'
import { useCallback, useMemo, useEffect } from 'react'

type PersistedColumnWidths = Record<string, number>

/**
 * Maximum reasonable column width in pixels. Any persisted or computed
 * width above this is treated as corrupted data and clamped.
 */
const MAX_COLUMN_WIDTH = 2000

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
  persistKey?: string,
  autoSizedWidths?: Record<string, number>
) {
  const defaultPersistKey = columns.map((column) => column.key).join('_')
  const storageKey = `${persistKey ?? defaultPersistKey}_column_widths`

  const storage = useBrowserStorage<PersistedColumnWidths>({
    key: storageKey,
    initialValue: {},
    store: window.localStorage
  })
  const persistedWidths = storage[0] ?? {}
  const setPersistedWidthsRaw = storage[3]
  
  // Wrapper to enable functional updates (useBrowserStorage doesn't support them natively)
  const setPersistedWidths = (
    update: PersistedColumnWidths | ((prev: PersistedColumnWidths) => PersistedColumnWidths)
  ) => {
    if (typeof update === 'function') {
      setPersistedWidthsRaw(update(persistedWidths))
    } else {
      setPersistedWidthsRaw(update)
    }
  }

  // Cache minWidth lookup for efficient access and consistent clamping.
  const minWidthByCol = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    for (const col of columns) {
      map[col.key] = col.minWidth ?? 50
    }
    return map
  }, [columns])

  const columnWidthOverrides = useMemo(
    () => new Set(Object.keys(persistedWidths)),
    [persistedWidths]
  )

  const columnWidths = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    for (const col of columns) {
      const minWidth = minWidthByCol[col.key]
      const defaultWidthRaw = col.defaultWidth ?? col.minWidth ?? 100
      const defaultWidth = Math.max(minWidth, defaultWidthRaw)
      const autoSizedWidth = autoSizedWidths?.[col.key]
      const idealWidth = autoSizedWidth ?? col.idealWidth ?? defaultWidth
      const persistedWidth = persistedWidths[col.key]
      const effectiveMax = col.maxWidth ?? MAX_COLUMN_WIDTH
      const baseWidth = persistedWidth ?? idealWidth
      const clamped = Math.min(effectiveMax, Math.max(minWidth, baseWidth))
      map[col.key] = clamped
    }
    return map
  }, [autoSizedWidths, columns, minWidthByCol, persistedWidths])

  const columnSizingOptions = useMemo<TableColumnSizingOptions>(() => {
    return columns.reduce<TableColumnSizingOptions>((acc, col) => {
      const minWidth = minWidthByCol[col.key]
      const persistedWidth = persistedWidths[col.key]
      const maxWidth =
        col.maxWidth !== undefined && col.maxWidth !== null && col.maxWidth >= minWidth
          ? col.maxWidth
          : undefined
      const clampWidth = (value: number) => {
        const clampedMin = Math.max(minWidth, value)
        const effectiveMax = maxWidth ?? MAX_COLUMN_WIDTH
        return Math.min(effectiveMax, clampedMin)
      }
      const defaultWidthRaw = col.defaultWidth ?? col.minWidth ?? 100
      const autoSizedWidth = autoSizedWidths?.[col.key]
      const defaultWidth = clampWidth(
        persistedWidth === undefined
          ? (autoSizedWidth ?? defaultWidthRaw)
          : persistedWidth
      )
      const idealWidthRaw = autoSizedWidth ?? col.idealWidth ?? defaultWidth
      const idealWidth = clampWidth(
        persistedWidth === undefined ? idealWidthRaw : persistedWidth
      )

      return {
        ...acc,
        [col.key]: {
          minWidth,
          defaultWidth,
          idealWidth
        }
      }
    }, {})
  }, [autoSizedWidths, columns, persistedWidths, minWidthByCol])

  const handleColumnResize = useCallback(
    (
      _e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      data: { columnId: string; width: number }
    ) => {
      const min = minWidthByCol[data.columnId] ?? 0
      const maxRaw = columns.find(col => col.key === data.columnId)?.maxWidth
      const max =
        maxRaw !== undefined && maxRaw !== null && maxRaw >= min
          ? maxRaw
          : undefined
      const clampedMin = Math.max(min, data.width)
      const effectiveMax = max ?? MAX_COLUMN_WIDTH
      const clamped = Math.min(effectiveMax, clampedMin)
      setPersistedWidths(prev => ({
        ...prev,
        [data.columnId]: clamped
      }))
    },
    [columns, minWidthByCol, setPersistedWidths]
  )

  // Prune widths for removed columns and normalize to minWidth when columns change.
  useEffect(() => {
    setPersistedWidths(prev => {
      const allowed = new Set(columns.map(c => c.key))
      let changed = false
      const next: PersistedColumnWidths = {}
      for (const k in prev) {
        if (allowed.has(k)) {
          const mw = minWidthByCol[k] ?? 0
          const colMaxWidth = columns.find(c => c.key === k)?.maxWidth ?? MAX_COLUMN_WIDTH
          const v = Math.min(colMaxWidth, Math.max(mw, prev[k]))
          next[k] = v
          if (v !== prev[k]) changed = true
        } else {
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [columns, minWidthByCol, setPersistedWidths])

  return {
    columnSizingOptions,
    handleColumnResize,
    columnWidths,
    columnWidthOverrides
  } as const
}
