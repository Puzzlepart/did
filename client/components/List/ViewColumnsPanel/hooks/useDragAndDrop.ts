import { DropResult } from 'react-beautiful-dnd'

/**
 * Hook for handling drag and drop functionality
 *
 * @param onReorder - Function to call when items are reordered
 *
 * @returns Object containing the drag end handler
 */
export const useDragAndDrop = (
  onReorder: (sourceIndex: number, destinationIndex: number) => void
) => {
  /**
   * Handle the end of a drag operation
   *
   * @param result - The result of the drag operation
   */
  const handleDragEnd = (result: DropResult) => {
    // If dropped outside the list or no destination, do nothing
    if (!result.destination) return

    onReorder(result.source.index, result.destination.index)
  }

  return {
    handleDragEnd
  }
}
