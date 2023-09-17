import { SelectionMode } from '@fluentui/react'

/**
 * @category List
 */

export interface IListSelectionProps<T = any> {
  mode: SelectionMode
  onChanged: (selected: T) => void
}
