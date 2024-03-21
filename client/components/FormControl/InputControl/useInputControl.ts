import { useCallback } from 'react'
import s from 'underscore.string'
import { useFormContext } from '../context'
import { CLEAR_VALIDATION_MESSAGE } from '../reducer'
import { IInputControlProps } from './types'

/**
 * Transform based on `type` and `options`.
 *
 * @param value - Value
 * @param options - Options
 */
function transformValue(
  value: any,
  { type, options = {} }: IInputControlProps
) {
  switch (type) {
    case 'number': {
      return Number.parseInt(value)
    }
    default: {
      let _value = value
      switch (options.casing) {
        case 'upper': {
          _value = _value.toUpperCase()
          break
        }
        case 'lower': {
          _value = _value.toLowerCase()
          break
        }
        case 'capitalized': {
          _value = s.capitalize(_value)
          break
        }
      }
      if (options?.replace) {
        const [regex, $] = options?.replace
        _value = _value.replace(regex, $)
      }
      return _value
    }
  }
}

/**
 * Hook for `InputControl` change handler. Returns a callback that can be used
 * as `onChange` handler. If the type of the control is `number`, the value
 * will be returned as is. Otherwise, the value will be transformed based on
 * the `InputControlOptions`.
 *
 * @param props - Props for the `InputControl` component.
 */
export function useInputControl(props: IInputControlProps) {
  const context = useFormContext()

  const onChange = useCallback(
    (_event, value) => {
      context.dispatch(CLEAR_VALIDATION_MESSAGE({ name: props.name }))
      props.model.set(props.name, transformValue(value, props))
    },
    [props.model]
  )

  const value = props.model.value<string>(props.name, '')

  return { onChange, value }
}
