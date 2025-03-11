import { ListField } from '../../types'

/**
 * Props for the ItemCell component.
 */
export interface IItemCellProps {
  /**
   * The index of the item in the list.
   */
  index: number

  /**
   * The field associated with the list item.
   */
  field: ListField

  /**
   * The value of the list item.
   */
  value?: any

  /**
   * Callback function to handle changes to the list item value.
   *
   * @param value - The new value of the list item.
   */
  onChange?: (value: any) => void

  /**
   * Indicates if the item is being edited.
   */
  isEditing: boolean

  /**
   * Callback function to toggle the edit state of the item.
   */
  onToggleEdit: () => void
}
