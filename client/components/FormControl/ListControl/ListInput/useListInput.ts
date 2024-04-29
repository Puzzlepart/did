/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMergedState } from 'hooks'
import { IListInputProps, IListInputState, ListField } from './types'
import _ from 'lodash'

export function useListInput(props: IListInputProps) {
  const { state, setState } = useMergedState<IListInputState>({
    items: _.isArray(props.value) ? props.value : [],
    currentItem: null
  })

  const onAddItem = () => {
    if (!state.currentItem) {
      return
    }

    const items = [...state.items, state.currentItem]

    setState({
      items,
      currentItem: null
    })

    props.onChange(items)
  }

  const onRemoveItem = (index: number) => {
    const items = state.items.filter((_, idx) => idx !== index)

    setState({
      items
    })

    props.onChange(items)
  }

  const onFieldChange = (
    field: ListField,
    value: string | number,
    index = -1
  ) => {
    if (index !== -1) {
      setState((previousState) => ({
        items: previousState.items.map((item, idx) => {
          if (idx === index) {
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

  const isItemValid = () =>
    props.fields.every((field) => Boolean(_.get(state.currentItem, field.key)))

  return {
    props,
    state,
    setState,
    onAddItem,
    onRemoveItem,
    onFieldChange,
    isItemValid
  }
}
