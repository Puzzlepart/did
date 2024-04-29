import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { IFormControlProps, IFormControlState } from './types'

/**
 * Interface for the form control context.
 */
export interface IFormControlContext
  extends IFormControlState,
    Pick<
      IFormControlProps,
      'model' | 'register' | 'additionalContext' | 'isEditMode'
    > {
  /**
   * The Redux dispatch function.
   */
  dispatch: Dispatch<AnyAction>

  /**
   * On blur callback that is called when a form control loses focus.
   * If enabled the field will be validated on blur.
   *
   * @param event - The blur event.
   */
  onBlurCallback: (event: any) => void

  /**
   * Retrieves the value of a specific extension property for a given key and extension ID.
   *
   * @param key - The key of the extension property.
   * @param extensionId - The ID of the extension.
   */
  getExtensionValue: <T = any>(key: string, extensionId: string) => T
}

/**
 * The form control context.
 */
export const FormControlContext = createContext<IFormControlContext>(null)

/**
 * Hook to get the form control context.
 *
 * @returns The form control context.
 */
export const useFormContext = () => useContext(FormControlContext)
