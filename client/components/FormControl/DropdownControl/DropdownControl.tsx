import { Dropdown, Option } from '@fluentui/react-components'
import React from 'react'
import _ from 'underscore'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './DropdownControl.module.scss'
import { IDropdownControlProps } from './types'
import { useDropdownControlChange } from './useDropdownControlChange'

/**
 * Text field based on `<Dropdown />` from [@fluentui/react](@fluentui/react)
 *
 * @category Reusable Component
 */
export const DropdownControl: FormInputControlComponent<IDropdownControlProps> =
  (props) => {
    const onChange = useDropdownControlChange(props)
    return (
      <Field className={DropdownControl.className} {...props}>
        <Dropdown onOptionSelect={onChange}>
          {_.map(props.values, (option, index) => (
            <Option key={index} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>
    )
  }

DropdownControl.displayName = 'DropdownControl'
DropdownControl.className = styles.dropdownControl
