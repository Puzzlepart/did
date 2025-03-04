import _ from 'lodash'
import { useContext, useState } from 'react'
import { SubscriptionContext } from '../../context'
import { InputProps } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { IListFieldProps } from './types'
import { format } from '@fluentui/react'

export function useListField(props: Partial<IListFieldProps>) {
  const context = useContext(SubscriptionContext)
  const { displayToast } = useAppContext()
  const items = _.get(context.settings, props.settingsKey, [])
  const [inputValue, setInputValue] = useState('')

  /**
   * Handles the change event for an input field.
   *
   * @param _event - The event object (not used).
   * @param data - The data object containing the input value.
   *
   * If the input value contains an '@' character, the value is split and only the part after the '@' is kept.
   * The resulting value is then set as the input value.
   */
  const onChange: InputProps['onChange'] = (_event, data) => {
    let value = data.value as string
    if (value.includes('@')) {
      value = value.split('@')[1]
    }
    setInputValue(value)
  }

  /**
   * Handles the key down event for the input field.
   *
   * @param event - The keyboard event object.
   * @param event.key - The key that was pressed.
   * @param event.currentTarget - The current target of the event.
   *
   * If the 'Enter' key is pressed, the function will:
   * - Ignore if the input value is empty or already exists in the items array.
   * - Add the input value to the list of items and update the context.
   * - Clear the input field.
   * - Display a success toast message if `props.onAddMessage` is provided.
   */
  const onKeyDown = ({ key, currentTarget }) => {
    if (key === 'Enter') {
      if (currentTarget.value.trim() === '') return
      if (items.includes(currentTarget.value)) return
      context.onChange(props.settingsKey, (currentValue: string[] = []) => {
        return [...currentValue, currentTarget.value].filter(Boolean)
      })
      setInputValue('')

      if (props.onAddMessage) {
        displayToast(format(props.onAddMessage, currentTarget.value), 'success')
      }
    }
  }

  /**
   * Handles the removal of an item from the list at the specified index.
   *
   * @param index - The index of the item to be removed.
   *
   * The function performs the following actions:
   * 1. Retrieves the item at the specified index from the `items` array.
   * 2. Calls `context.onChange` to update the list by filtering out the item at the specified index.
   * 3. If `props.onRemoveMessage` is provided, displays a success toast message with the formatted removal message.
   */
  const onRemove = (index: number) => {
    const item = items[index]
    context.onChange(props.settingsKey, (value: string[] = []) =>
      value.filter((_item, index_) => index_ !== index)
    )
    if (props.onRemoveMessage) {
      displayToast(format(props.onRemoveMessage, item), 'success')
    }
  }

  return {
    items,
    inputValue,
    onChange,
    onKeyDown,
    onRemove
  }
}
