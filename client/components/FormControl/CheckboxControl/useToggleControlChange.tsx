import { useCallback } from 'react'
import { ChecboxControlOptions, ICheckboxControlProps } from './types'

/**
 * Transform based on `ToggleControlOptions`
 *
 * @param value - Value
 * @param options - Options
 *
 * @returns transformed value
 */
function transformValue(value: string, _options: ChecboxControlOptions) {
  return value
}

export function useToggleControlChange({
  model,
  name,
  options
}: ICheckboxControlProps) {
  return useCallback((_event, value) => {
    model.set(name, transformValue(value, options))
  }, [])
}
