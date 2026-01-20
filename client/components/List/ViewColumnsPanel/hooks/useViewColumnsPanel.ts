import { useEffect, useMemo, useRef, useState } from 'react'
import { useListContext } from '../../context'
import { UPDATE_COLUMNS } from '../../reducer'
import { IListColumn } from '../../types'
import { useViewColumnsPersist } from './useViewColumnsPersist'

/**
 * Hook for managing column state and operations in the `ViewColumnsPanel`
 *
 * @returns Object containing columns state and methods for managing columns
 */
export const useViewColumnsPanel = () => {
  const context = useListContext()
  const [columns, setColumns] = useState<IListColumn[]>(context.props.columns)
  const persist = useViewColumnsPersist(columns)
  const lastSyncSignature = useRef<string>('')
  const dispatchRef = useRef(context.dispatch)
  dispatchRef.current = context.dispatch

  const getSignature = (columns: IListColumn[]) =>
    columns
      .map((column) => `${column.key}:${column.data?.hidden ? '1' : '0'}`)
      .join('|')

  const persistedColumns = useMemo(
    () => persist.apply(context.props.columns),
    [persist, context.props.columns]
  )

  useEffect(() => {
    const signature = getSignature(persistedColumns)
    if (signature !== lastSyncSignature.current) {
      lastSyncSignature.current = signature
      setColumns(persistedColumns)
    }
  }, [persistedColumns])

  useEffect(() => {
    const signature = getSignature(columns)
    if (signature !== lastSyncSignature.current) {
      lastSyncSignature.current = signature
      dispatchRef.current(UPDATE_COLUMNS(columns))
      persist.update()
    }
  }, [columns, persist])

  /**
   * Toggle the visibility of a column
   *
   * @param key - The key of the column to toggle
   */
  const toggleColumnVisibility = (key: string) => {
    const updatedColumns = columns.map((column) =>
      column.key === key
        ? { ...column, data: { ...column.data, hidden: !column.data?.hidden } }
        : column
    )
    setColumns(updatedColumns)
  }

  /**
   * Update the order of columns after drag and drop
   *
   * @param sourceIndex - The source index of the dragged column
   * @param destinationIndex - The destination index where the column was dropped
   */
  const reorderColumns = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return

    const items = Array.from(columns)
    const [reorderedItem] = items.splice(sourceIndex, 1)
    items.splice(destinationIndex, 0, reorderedItem)

    setColumns(items)
  }

  return {
    columns,
    toggleColumnVisibility,
    reorderColumns
  }
}
