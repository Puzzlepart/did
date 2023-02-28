/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import s from 'underscore.string'
import { ITextControlProps, TextControlOptions } from './types'

/**
 * Transform based on `TextControlOptions`
 *
 * @param value - Value
 * @param options - Options
 *
 * @returns transformed value
 */
function transformValue(value: string, options: TextControlOptions) {
  let _value = value
  switch (options?.casing) {
    case 'upper':
      _value = _value.toUpperCase()
      break
    case 'lower':
      _value = _value.toLowerCase()
      break
    case 'capitalized':
      _value = s.capitalize(_value)
      break
  }
  if (options?.replace) {
    const [regex, $] = options?.replace
    _value = _value.replace(regex, $)
  }
  return _value
}

/**
 * Hook for `TextControl` change handler. Returns a callback that can be used
 * as `onChange` handler. If the type of the control is `number`, the value
 * will be returned as is. Otherwise, the value will be transformed based on
 * the `TextControlOptions`.
 */
export function useTextControlChange({
  model,
  name,
  options,
  type
}: ITextControlProps) {
  return useCallback((_event, value) => {
    model.set(
      name,
      type === 'number'
        ? Number.parseInt(value)
        : transformValue(value, options)
    )
  }, [])
}
