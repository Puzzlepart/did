import { useCallback } from 'react'
import { useFormContext } from '../context'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer'
import { ISliderControlProps } from './types'

/**
 * Hook for `liderControl` change handler. Returns a callback that can be used
 * as `onChange` handler.
 *
 * @param props - Props for the `SliderControl` component.
 */
export function useSliderControl(props: ISliderControlProps) {
  const context = useFormContext()

  const onChange = useCallback(
    (_event, value) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, value)
    },
    [props.model]
  )

  const value = props.model.value<number>(props.name, props.defaultValue)

  return { onChange, value }
}
