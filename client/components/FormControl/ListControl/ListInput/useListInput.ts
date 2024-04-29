/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMergedState } from 'hooks'
import { IListInputProps, IListInputState, ListField } from './types'
import _ from 'lodash'

export function useListInput(props: IListInputProps) {
  const { state, setState } = useMergedState<IListInputState>({
    isDataLoaded: true,
    items: [],
    currentItem: null
  })

  const onAddItem = () => {
    if (!state.currentItem) {
      return
    }

    setState((previousState) => ({
      items: [...previousState.items, previousState.currentItem],
      currentItem: null
    }))
  }

  const onFieldChange = (field: ListField, value: string) => {
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
    onFieldChange,
    isItemValid
  }
}
