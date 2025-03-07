import { useCallback } from 'react'
import { useFormContext } from '../context'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer'
import { IDateControlProps } from './types'

/**
 * Hook for `DateControl` change handler. Returns a callback that can be used
 * as `onChange` handler.
 *
 * @param props - Props for the `DateControl` component.
 */
export function useDateControl(props: IDateControlProps) {
  const context = useFormContext()

  const onChange = useCallback(
    (value) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, value)
    },
    [props.model]
  )

  const value = props.model.value<string>(props.name, null)
  const dateValue = value ? new Date(value) : null

  return { onChange, value: dateValue }
}
