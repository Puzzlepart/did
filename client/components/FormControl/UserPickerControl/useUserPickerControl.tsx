import { useCallback } from 'react'
import { useFormContext } from '../context'
import { IUserPickerControlProps } from './types'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer/actions'
import { User } from '../../../../server/graphql'

/**
 * Transform the value for the `UserPickerControl`.
 *
 * @param value The value to transform.
 * @param props The props of the user picker control.
 */
function transformValue(value: User[], props: IUserPickerControlProps) {
  // eslint-disable-next-line no-console
  console.log('transformValue called', value, props.name)
  if (props.multiple) {
    return []
  }
  return null
}

export function useUserPickerControl(props: IUserPickerControlProps) {
  const context = useFormContext()
  // eslint-disable-next-line no-console
  console.log('useUserPickerControl called', props.model)

  const onChange = useCallback(
    (value: User[]) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, transformValue(value, props))
    },
    [props.model]
  )

  const value = props.model.value<any>(props.name, '')
  return { onChange, value }
}
