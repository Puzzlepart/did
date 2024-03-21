import type { DatePickerProps } from '@fluentui/react-datepicker-compat'
import { BaseControlOptions, FormInputControlBase } from '../types'

export interface DateControlOptions extends BaseControlOptions {}

export interface IDateControlProps
  extends FormInputControlBase<DateControlOptions>,
    Pick<DatePickerProps, 'appearance' | 'allowTextInput'> {}
