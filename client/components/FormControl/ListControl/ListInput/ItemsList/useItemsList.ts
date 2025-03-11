import { isEqual } from 'lodash'
import { createElement, useCallback, useState } from 'react'
import { EditingState } from './types'
import { useListInputContext } from '../context'
import { ListField } from '../types'
import { ItemCell } from './ItemCell'
import { IColumn } from '@fluentui/react'

type UseItemsListReturnType = {
  /**
   * Function to check if an field for an item is currently being edited.
   *
   * @param index Index of the item in the list.
   * @param key Key of the field being edited.
   */
  isEditing: (index?: number, key?: string) => boolean

  /**
   * Creates a column object for a field.
   *
   * @param field Field object to create a column for.
   */
  createColumn: (field: ListField) => IColumn

  /**
   * The field object corresponding to the currently edited item, if any.
   */
  field: ListField
}

/**
 * Custom hook that provides functionality for managing the editing state of items in a list.
 *
 * @returns An object containing the following properties:
 * - `onToggleEdit` (function): A callback function to toggle the editing state of an item.
 * - `isEditing` (function): A function to check if an item is currently being edited.
 * - `field` (Object | undefined): The field object corresponding to the currently edited item, if any.
 */
export const useItemsList = (): UseItemsListReturnType => {
  const context = useListInputContext()
  const [editing, setEditing] = useState<EditingState>(null)

  const onToggleEdit = useCallback(
    (index: number, key: string) => {
      setEditing(isEqual(editing, { index, key }) ? null : { index, key })
    },
    [editing]
  )

  const isEditing = (index?: number, key?: string) =>
    Boolean(key) ? isEqual(editing, { index, key }) : Boolean(editing)

  const field = context.props.fields.find((field) => field.key === editing?.key)

  const createColumn = (field: ListField): IColumn => ({
    key: field.key,
    fieldName: field.key,
    name: field.label,
    minWidth: 100,
    maxWidth: field.maxWidth ?? 140,
    onRender: (item: any, index: number) =>
      createElement(ItemCell, {
        index,
        field,
        value: item[field.key],
        isEditing: isEditing(index, field.key),
        onToggleEdit: () => onToggleEdit(index, field.key)
      })
  })

  return { isEditing, createColumn, field }
}
