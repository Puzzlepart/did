import { useEffect, useState } from 'react'
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

  useEffect(() => {
    setColumns(persist.apply(context.props.columns))
  }, [context.props.columns])

  useEffect(() => {
    context.dispatch(UPDATE_COLUMNS(columns))

    persist.update()
  }, [columns, context])

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
