import { IFieldProps } from '../Field'
import { FormInputControlBase } from '../types'

// eslint-disable-next-line @typescript-eslint/ban-types
export type ChecboxControlOptions = {}

export interface ICheckboxControlProps
  extends FormInputControlBase<ChecboxControlOptions>,
    IFieldProps {}
