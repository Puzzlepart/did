import { createContext, useContext } from 'react'
import { IFormControlProps } from './types'
import { useFormControlValidation } from './useFormControlValidation'

/**
 * Interface for the form control context.
 */
export interface IFormControlContext {
  /**
   * The model object for the form control.
   */
  model: IFormControlProps['model']

  /**
   * The validation messages for the form control.
   */
  validationMessages: ReturnType<
    typeof useFormControlValidation
  >['validationMessages']
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
