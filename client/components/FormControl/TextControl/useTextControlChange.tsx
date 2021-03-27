/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { ITextControlProps, TextControlOptions } from './types'
import { capitalize } from 'underscore.string'

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
    case 'upper': _value = _value.toUpperCase()
      break
    case 'lower': _value = _value.toLowerCase()
      break
    case 'capitalized': _value = capitalize(_value)
      break
  }
  return _value
}

export function useTextControlChange({ model, name, options }: ITextControlProps) {
  return useCallback((_event, value) => {
    model.set(name, transformValue(value, options))
  }, [])
}
