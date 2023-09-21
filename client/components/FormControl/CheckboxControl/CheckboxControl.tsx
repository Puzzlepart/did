import { Checkbox } from '@fluentui/react-components'
import React from 'react'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './CheckboxControl.module.scss'
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
      <Field className={CheckboxControl.className} {...props}>
        <Checkbox
          onChange={(event, data) => onChange(event, data?.checked)}
          checked={props.model.value<boolean>(props.name, false)}
        />
      </Field>
    )
  }

CheckboxControl.displayName = 'CheckboxControl'
CheckboxControl.className = styles.checkboxControl
