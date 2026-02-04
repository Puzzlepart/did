import { TableColumnSizingOptions } from '@fluentui/react-components'
import { IListColumn } from '../types'
import { useBrowserStorage } from 'hooks'
import { useCallback, useMemo, useRef, useEffect } from 'react'

type PersistedColumnWidths = Record<string, number>
type StorageLike = {
  readonly length: number
  clear: () => void
  getItem: (key: string) => string | null
  key: (index: number) => string | null
  removeItem: (key: string) => void
  setItem: (key: string, value: string) => void
}

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

  const memoryStoreRef = useRef<StorageLike | null>(null)
  if (!memoryStoreRef.current) {
    const cache = new Map<string, string>()
    memoryStoreRef.current = {
      get length() {
        return cache.size
      },
      clear: () => {
        cache.clear()
      },
      getItem: (key) => cache.get(key) ?? null,
      key: (index) => {
        const keys = Array.from(cache.keys())
        return keys[index] ?? null
      },
      removeItem: (key) => {
        cache.delete(key)
      },
      setItem: (key, value) => {
        cache.set(key, String(value))
      }
    }
  }

  const storage = useBrowserStorage<PersistedColumnWidths>({
    key: storageKey,
    initialValue: {},
    store: persistKey ? window.localStorage : memoryStoreRef.current
  })
  const persistedWidths = storage[0] ?? {}
  const setPersistedWidthsRaw = storage[3]

  // Wrapper to enable functional updates (useBrowserStorage doesn't support them natively)
  const setPersistedWidths = (
    update:
      | PersistedColumnWidths
      | ((prev: PersistedColumnWidths) => PersistedColumnWidths)
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
      const idealWidth = col.idealWidth ?? defaultWidth
      const persistedWidth = persistedWidths[col.key]
      const baseWidth = persistedWidth ?? idealWidth
      const clamped = Math.max(minWidth, baseWidth)
      map[col.key] = clamped
    }
    return map
  }, [columns, minWidthByCol, persistedWidths])

  const columnSizingOptions = useMemo<TableColumnSizingOptions>(() => {
    return columns.reduce<TableColumnSizingOptions>((acc, col) => {
      const minWidth = minWidthByCol[col.key]
      const persistedWidth = persistedWidths[col.key]
      const maxWidth =
        col.maxWidth !== undefined &&
        col.maxWidth !== null &&
        col.maxWidth >= minWidth
          ? col.maxWidth
          : undefined
      const clampWidth = (value: number) => {
        const clampedMin = Math.max(minWidth, value)
        if (maxWidth === undefined || maxWidth === null) return clampedMin
        return Math.min(maxWidth, clampedMin)
      }
      const defaultWidthRaw = col.defaultWidth ?? col.minWidth ?? 100
      const defaultWidth = clampWidth(
        persistedWidth === undefined ? defaultWidthRaw : persistedWidth
      )
      const idealWidthRaw = col.idealWidth ?? defaultWidth
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
  }, [columns, persistedWidths, minWidthByCol])

  const handleColumnResize = useCallback(
    (
      _e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      data: { columnId: string; width: number }
    ) => {
      const min = minWidthByCol[data.columnId] ?? 0
      const maxRaw = columns.find((col) => col.key === data.columnId)?.maxWidth
      const max =
        maxRaw !== undefined && maxRaw !== null && maxRaw >= min
          ? maxRaw
          : undefined
      const clampedMin = Math.max(min, data.width)
      const clamped =
        max === undefined || max === null
          ? clampedMin
          : Math.min(max, clampedMin)
      setPersistedWidths((prev) => ({
        ...prev,
        [data.columnId]: clamped
      }))
    },
    [columns, minWidthByCol, setPersistedWidths]
  )

  // Prune widths for removed columns and normalize to minWidth when columns change.
  useEffect(() => {
    setPersistedWidths((prev) => {
      const allowed = new Set(columns.map((c) => c.key))
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
  }, [columns, minWidthByCol, setPersistedWidths])

  return {
    columnSizingOptions,
    handleColumnResize,
    columnWidths,
    columnWidthOverrides
  } as const
}
