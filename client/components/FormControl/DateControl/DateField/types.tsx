import type { DatePickerProps } from '@fluentui/react-datepicker-compat'
import { IFieldProps } from '../../Field'

export interface IDateFieldProps
  extends Pick<
      DatePickerProps,
      'allowTextInput' | 'value' | 'onChange' | 'onSelectDate'
    >,
    IFieldProps {}
