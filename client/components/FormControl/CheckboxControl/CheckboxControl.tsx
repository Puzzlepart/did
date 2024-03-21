import React from 'react'
import { FormInputControlComponent } from '../types'
import { CheckboxField } from './CheckboxField'
import { ICheckboxControlProps } from './types'
import { useCheckboxControl } from './useCheckboxControl'

/**
 * Text field based on `<Checkbox />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const CheckboxControl: FormInputControlComponent<
  ICheckboxControlProps
> = (props) => {
  const { onChange, checked } = useCheckboxControl(props)
  return (
    <CheckboxField
      {...props}
      onChange={(event, data) => onChange(event, data?.checked)}
      checked={checked}
    />
  )
}

CheckboxControl.displayName = 'CheckboxControl'
