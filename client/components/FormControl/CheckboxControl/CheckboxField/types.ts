import { CheckboxProps } from '@fluentui/react-components'
import { IFieldProps } from '../../Field'

export interface ICheckboxFieldProps extends Pick<CheckboxProps, 'checked' | 'onChange'>, IFieldProps {}
