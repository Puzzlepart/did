/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { IToggleControlProps, ToggleControlOptions } from './types'

/**
 * Transform based on `ToggleControlOptions`
 *
 * @param value - Value
 * @param options - Options
 *
 * @returns transformed value
 */
function transformValue(value: string, _options: ToggleControlOptions) {
  return value
}

export function useToggleControlChange({
  model,
  name,
  options
}: IToggleControlProps) {
  return useCallback((_event, value) => {
    model.set(name, transformValue(value, options))
  }, [])
}
