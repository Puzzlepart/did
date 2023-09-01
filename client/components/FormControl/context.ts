import { createContext, useContext } from 'react'
import { IFormControlProps } from './types'

export interface IFormControlContext {
  model: IFormControlProps['model']
}

export const FormControlContext = createContext<IFormControlContext>(null)

export const useFormControlContext = () => useContext(FormControlContext)
