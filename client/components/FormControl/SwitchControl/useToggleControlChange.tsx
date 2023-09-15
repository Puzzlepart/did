import { useCallback } from 'react'
import { SwitchControlOptions } from './types'
import { FormInputControlBase } from '../types'

/**
 * Transform based on `ToggleControlOptions`
 *
 * @param value - Value
 * @param options - Options
 *
 * @returns transformed value
 */
function transformValue(value: string, _options: SwitchControlOptions) {
  return value
}

export function useToggleControlChange({
  model,
  name,
  options
}: FormInputControlBase) {
  return useCallback((_event, value) => {
    model.set(name, transformValue(value, options))
  }, [])
}
