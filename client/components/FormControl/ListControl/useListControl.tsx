import { useCallback } from 'react'
import { useFormContext } from '../context'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer/actions'
import { IListControlProps } from './types'

/**
 * Custom hook for managing the `ListControl` com
 *
 * @param props - The props for the list control.
 *
 * @returns An object containing the `onChange` function and the current `value` of the control.
 */
export function useListControl(props: IListControlProps) {
  const context = useFormContext()

  const onChange = useCallback(
    (value) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, value)
    },
    [props.model]
  )

  const value = props.model.value<IListControlProps['value']>(props.name, '')

  return { onChange, value }
}
