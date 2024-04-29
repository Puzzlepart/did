import { useCallback } from 'react'
import { FormInputControlBase } from '../types'

/**
 * Custom hook for handling switch control logic.
 *
 * @param props - The props for the switch control.
 * @returns An object containing the `onChange` function.
 */
export function useSwitchControl(props: FormInputControlBase) {
  const value = props.model?.value<boolean>(props.name)

  const onChange = useCallback(
    (_event, value: boolean) => {
      props.model.set(props.name, value)
    },
    [props.model]
  )

  return { value, onChange }
}
