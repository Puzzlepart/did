import React from 'react'
import { FormInputControlComponent } from '../types'
import { CheckboxField } from './CheckboxField'
import { ICheckboxControlProps } from './types'
import { useCheckboxControlChange } from './useCheckboxControlChange'

/**
 * Text field based on `<Checkbox />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const CheckboxControl: FormInputControlComponent<ICheckboxControlProps> =
  (props) => {
    const onChange = useCheckboxControlChange(props)
    return (
      <CheckboxField
        {...props}
        onChange={(event, data) => onChange(event, data?.checked)}
        checked={props.model.value<boolean>(props.name, false)}
      />
    )
  }

CheckboxControl.displayName = 'CheckboxControl'
