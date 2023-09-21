import { useCallback } from 'react'
import { FormInputControlBase } from '../types'

/**
 * Returns a callback function that updates the value of a Switch control in a form model.
 *
 * @param options - The options object containing the form model,
 * control name, and any additional options.
 *
 * @returns - The callback function that updates the form model with the new Switch value.
 */
export function useSwitchControlChange({ model, name }: FormInputControlBase) {
  return useCallback((_event, value) => {
    model.set(name, value)
  }, [])
}
