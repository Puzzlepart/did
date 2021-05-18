import { useMap } from 'hooks/common/useMap'
import { useCallback } from 'react'
import { FormInputControlBase } from './types'

/**
 * Register control with a `model`
 *
 * @param name - Name
 * @param model - Model
 * @param options - Control options
 *
 * @returns `FormInputControlBase`
 */
function registerControl<O = any>(
  name: string,
  model: ReturnType<typeof useMap>,
  options?: O
): FormInputControlBase<O> {
  return {
    name,
    model,
    options
  }
}

export type RegisterControlCallback = <O>(
  name: string,
  options?: O
) => FormInputControlBase<O>

/**
 * Use form controls
 *
 * @param model - Model
 *
 * @returns a callback to register a new control
 */
export function useFormControls(
  model: ReturnType<typeof useMap>
): RegisterControlCallback {
  return useCallback(
    (name: string, options?: any) => {
      return registerControl(name, model, options)
    },
    [model]
  )
}
