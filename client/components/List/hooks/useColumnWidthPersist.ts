import { TableColumnSizingOptions } from '@fluentui/react-components'
import { IListColumn } from '../types'
import { useBrowserStorage } from 'hooks'
import { useCallback, useMemo, useRef, useEffect } from 'react'

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
  // Generate a stable ephemeral key per hook instance to avoid collisions when persistKey is not provided.
  const ephemeralKeyRef = useRef<string>(
    `__ephemeral_column_widths__${Math.random().toString(36).slice(2)}`
  )
  const storageKey = persistKey
    ? `${persistKey}_column_widths`
    : ephemeralKeyRef.current

  const storage = useBrowserStorage<PersistedColumnWidths>({
    key: storageKey,
    initialValue: {}
  })
  const persistedWidths = storage[0]
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

  const columnSizingOptions = useMemo<TableColumnSizingOptions>(() => {
    return columns.reduce<TableColumnSizingOptions>((acc, col) => {
      const minWidth = minWidthByCol[col.key]
      const defaultWidthRaw = col.defaultWidth ?? col.minWidth ?? 100
      const defaultWidth = Math.max(minWidth, defaultWidthRaw)
      const persistedWidth = persistKey ? persistedWidths?.[col.key] : undefined
      const idealWidth =
        persistedWidth === undefined
          ? col.idealWidth ?? defaultWidth
          : Math.max(minWidth, persistedWidth)

      return {
        ...acc,
        [col.key]: {
          minWidth,
          defaultWidth,
          idealWidth
        }
      }
    }, {})
  }, [columns, persistKey, persistedWidths, minWidthByCol])

  const handleColumnResize = useCallback(
    (
      _e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      data: { columnId: string; width: number }
    ) => {
      if (!persistKey) return
      const min = minWidthByCol[data.columnId] ?? 0
      const clamped = Math.max(min, data.width)
      setPersistedWidths(prev => ({
        ...prev,
        [data.columnId]: clamped
      }))
    },
    [persistKey, minWidthByCol, setPersistedWidths]
  )

  // Prune widths for removed columns and normalize to minWidth when columns change.
  useEffect(() => {
    if (!persistKey) return
    setPersistedWidths(prev => {
      const allowed = new Set(columns.map(c => c.key))
      let changed = false
      const next: PersistedColumnWidths = {}
      for (const k in prev) {
        if (allowed.has(k)) {
          const mw = minWidthByCol[k] ?? 0
          const v = Math.max(mw, prev[k])
          next[k] = v
          if (v !== prev[k]) changed = true
        } else {
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [columns, minWidthByCol, persistKey, setPersistedWidths])

  return { columnSizingOptions, handleColumnResize } as const
}
