import { useCallback } from 'react'
import { User } from '../../../../server/graphql'
import { useFormContext } from '../context'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer/actions'
import { IListControlProps } from './types'

/**
 * Custom hook for managing the `UserPickerControl` com
 *
 * @param props - The props for the user picker control.
 *
 * @returns An object containing the `onChange` function and the current `value` of the control.
 */
export function useListControl(props: IListControlProps) {
  const context = useFormContext()

  const onChange = useCallback(
    (value: User[]) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, value)
    },
    [props.model]
  )

  const value = props.model.value<IListControlProps['value']>(props.name, '')

  return { onChange, value }
}
