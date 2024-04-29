import { useCallback } from 'react'
import _ from 'underscore'
import { User } from '../../../../server/graphql'
import { useFormContext } from '../context'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer/actions'
import { IUserPickerControlProps } from './types'

/**
 * Transform the value for the `UserPickerControl`.
 *
 * @param value The value to transform.
 * @param props The props of the user picker control.
 */
function transformValue(value: User[], props: IUserPickerControlProps) {
  if (props.multiple) {
    return value.map((user) =>
      _.pick(user, ['id', ...Object.keys(props.additionalMetadata)])
    )
  }
  return _.first(value)?.id ?? null
}

/**
 * Custom hook for managing the `UserPickerControl` com
 *
 * @param props - The props for the user picker control.
 *
 * @returns An object containing the `onChange` function and the current `value` of the control.
 */
export function useUserPickerControl(props: IUserPickerControlProps) {
  const context = useFormContext()

  const onChange = useCallback(
    (value: User[]) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, transformValue(value, props))
    },
    [props.model]
  )

  const value = props.model.value<IUserPickerControlProps['value']>(
    props.name,
    ''
  )
  return { onChange, value }
}
