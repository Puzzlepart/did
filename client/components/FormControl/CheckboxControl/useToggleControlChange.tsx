import { useCallback } from 'react'
import { ICheckboxControlProps } from './types'

export function useToggleControlChange({ model, name }: ICheckboxControlProps) {
  return useCallback((_event, value) => {
    model.set(name, value)
  }, [])
}
