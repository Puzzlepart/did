import { useCallback } from 'react'
import { ICheckboxControlProps } from './types'

export function useCheckboxControlChange({
  model,
  name
}: ICheckboxControlProps) {
  return useCallback((_event, value) => {
    model.set(name, value)
  }, [])
}
