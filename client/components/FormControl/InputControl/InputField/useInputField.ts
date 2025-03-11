import React from 'react'
import { IInputFieldProps } from './types'

/**
 * Prevents the default action and stops the propagation of the given keyboard event.
 *
 * This function is typically used to retain focus on an input field by preventing
 * the default behavior and stopping the event from propagating further.
 *
 * @param event - The keyboard event triggered on the input field.
 */
function retainFocus(event: React.KeyboardEvent<HTMLInputElement>) {
  event.preventDefault()
  event.stopPropagation()
}

/**
 * Custom hook to handle keyboard events for an input field.
 *
 * @param props - The properties for the input field.
 * @returns An object containing the `onKeyDown` event handler.
 *
 * @remarks
 * The `onKeyDown` handler processes the following keys:
 * - `Enter`: Calls `props.onEnter` with the current input value and event.
 * - `Escape`: Calls `props.onCancel` with the event.
 * - `ArrowUp`: Increments the input value by `props.increment` and calls `props.onChange` if the value is an integer.
 * - `ArrowDown`: Decrements the input value by `props.decrement` and calls `props.onChange` if the value is an integer.
 */
export function useInputField(props: IInputFieldProps) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': {
        if (props.onEnter) {
          props.onEnter(event.currentTarget.value, event)
        }
        break
      }
      case 'Escape': {
        if (props.onCancel) {
          props.onCancel(event)
        }
        break
      }
      case 'ArrowUp': {
        if (!props.increment) return
        if (props.onChange && Number.isInteger(props.value)) {
          props.onChange(
            { type: 'increment' },
            {
              value: (props.value as unknown as number) + props.increment
            }
          )
          return retainFocus(event)
        }
        break
      }
      case 'ArrowDown': {
        if (!props.decrement) return
        if (props.onChange && Number.isInteger(props.value)) {
          props.onChange(
            { type: 'decrement' },
            {
              value: (props.value as unknown as number) - props.decrement
            }
          )
          return retainFocus(event)
        }
        break
      }
    }
  }
  return { onKeyDown }
}
