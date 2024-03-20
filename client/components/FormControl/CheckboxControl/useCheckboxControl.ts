import { useCallback } from 'react'
import { ICheckboxControlProps } from './types'

/**
 * Hook for `CheckboxControl` change handler. Returns a callback that can be used
 * as `onChange` handler.
 *
 * @param props - Props for the `InputControl` component.
 */
export function useCheckboxControl(props: ICheckboxControlProps) {
  const onChange = useCallback(
    (_event, value) => {
      props.model.set(props.name, value)
    },
    [props.model]
  )

  const checked = props.model.value<boolean>(props.name, false)

  return { onChange, checked }
}
