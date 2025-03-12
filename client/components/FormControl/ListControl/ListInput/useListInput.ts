/* eslint-disable unicorn/consistent-function-scoping */
import { useMergedState } from 'hooks'
import { IListInputProps, IListInputState, ListField } from './types'
import _ from 'lodash'

type UseListInputReturnType = {
  /**
   * The properties for the list input.
   */
  props: IListInputProps

  /**
   * The state of the list input.
   */
  state: IListInputState

  /**
   * Sets the state of the list input.
   *
   * @param state State to set.
   */
  setState: (state: IListInputState) => void

  /**
   * On add item handler.
   */
  onAddItem: () => void

  /***
   * On update item handler.
   *
   * @param index Index of the item to update.
   * @param field Field to update.
   * @param value Value to set.
   */
  onUpdateItem: (index: number, field: ListField, value: string) => void

  /**
   * On remove item handler.
   *
   * @param index Index of the item to remove.
   */
  onRemoveItem: (index: number) => void

  /**
   * On field change handler.
   *
   * @param field Field to update.
   * @param value Value to set.
   * @param index Index of the item to update.
   */
  onFieldChange: (
    field: ListField,
    value: string | number | boolean,
    index?: number
  ) => void

  /**
   * Checks if the current item is valid.
   *
   * @returns Whether the current item is valid.
   */
  isItemValid: () => boolean
}

/**
 * Custom hook to manage a list input state and handlers.
 *
 * @param props - The properties for the list input.
 * @returns An object containing the state and handlers for the list input.
 */
export const useListInput = (
  props: IListInputProps
): UseListInputReturnType => {
  const { state, setState } = useMergedState<IListInputState>({
    items: _.isArray(props.value) ? props.value : [],
    currentItem: props.fields
    .filter((field) => field.defaultValue !== undefined)
    .reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field.key]: field.defaultValue
      }),
      {}
    )
  })

  const onAddItem: UseListInputReturnType['onAddItem'] = () => {
    if (!state.currentItem) {
      return
    }

    let item = { ...state.currentItem }
    if (props.generateId) {
      item = {
        id: props.generateId(),
        ...item
      }
    }

    const items = [...state.items, item]

    setState({
      items,
      currentItem: null
    })

    props.onChange(items)
  }

  const onUpdateItem: UseListInputReturnType['onUpdateItem'] = (
    index: number,
    field: ListField,
    value: string
  ) => {
    const items = [...state.items].map((item, index_) => {
      if (index_ === index) {
        const _item = { ...item, [field.key]: value }
        if (props.generateId) {
          return {
            id: item.id ?? props.generateId(),
            ..._item
          }
        }
        return _item
      }
      return item
    })

    setState({
      items
    })

    props.onChange(items)
  }

  const onRemoveItem: UseListInputReturnType['onRemoveItem'] = (
    index: number
  ) => {
    const items = state.items.filter((_, index_) => index_ !== index)

    setState({
      items
    })

    props.onChange(items)
  }

  const onFieldChange: UseListInputReturnType['onFieldChange'] = (
    field: ListField,
    value: string | number | boolean,
    index = -1
  ) => {
    if (index !== -1) {
      setState((previousState) => ({
        items: previousState.items.map((item, index_) => {
          if (index_ === index) {
            return {
              ...item,
              [field.key]: value
            }
          }
          return item
        })
      }))
      return
    }
    setState((previousState) => ({
      currentItem: {
        ...previousState.currentItem,
        [field.key]: value
      }
    }))
  }

  const isItemValid: UseListInputReturnType['isItemValid'] = () =>
    props.fields.every(
      (field) => !field.required || Boolean(_.get(state.currentItem, field.key))
    )

  return {
    props,
    state,
    setState,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onFieldChange,
    isItemValid
  }
}
