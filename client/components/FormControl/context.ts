import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { IFormControlProps, IFormControlState } from './types'

/**
 * Interface for the form control context.
 */
export interface IFormControlContext extends IFormControlState {
  /**
   * The model object for the form control.
   */
  model: IFormControlProps['model']

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
