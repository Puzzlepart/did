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

export function useTextControlChange({
  model,
  name,
  options
}: ITextControlProps) {
  return useCallback((_event, value) => {
    model.set(name, transformValue(value, options))
  }, [])
}
