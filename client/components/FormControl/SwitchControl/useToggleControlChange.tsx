import { useCallback } from 'react'
import { FormInputControlBase } from '../types'
import { SwitchControlOptions } from './types'

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
