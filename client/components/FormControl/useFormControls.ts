/* eslint-disable @typescript-eslint/ban-types */
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
function registerControl<TOptions = any, KeyType = string>(
  name: KeyType,
  model: ReturnType<typeof useMap>,
  options?: TOptions
): FormInputControlBase<TOptions, KeyType> {
  return {
    id: `form_control_${name}`,
    name,
    model,
    options
  }
}

/**
 * A callback function that registers a form input control with the given name and options.
 *
 * @template O The type of options for the form input control.
 *
 * @param name The name of the form input control.
 * @param options The options for the form input control.
 *
 * @returns A `FormInputControlBase` instance with the given options.
 */
export type RegisterControlCallback<TOptions = {}, KeyType = string> = (
  name: KeyType,
  options?: TOptions
) => FormInputControlBase<TOptions>

/**
 * Use form controls
 *
 * @param model - Model
 *
 * @returns A callback to register a new control
 */
export function useFormControls<KeyType extends string = any>(
  model: ReturnType<typeof useMap>
) {
  return useCallback(
    <TOptions = {}>(name: KeyType, options?: TOptions) =>
      registerControl<TOptions, KeyType>(name, model, options),
    [model]
  )
}
