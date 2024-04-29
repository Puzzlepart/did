import { Dropdown, Option } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { Field } from '../../Field'
import styles from './DropdownField.module.scss'
import { IDropdownFieldProps } from './types'

/**
 * Text field based on `<Dropdown />` from [@fluentui/react](@fluentui/react)
 *
 * @category Reusable Component
 */
export const DropdownField: StyledComponent<IDropdownFieldProps> = (props) => {
  return (
    <Field className={DropdownField.className} {...props}>
      <Dropdown
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onOptionSelect={props.onChange}
      >
        {_.map(props.values, (option, index) => (
          <Option key={index} value={option.value}>
            {option.text}
          </Option>
        ))}
      </Dropdown>
    </Field>
  )
}

DropdownField.displayName = 'DropdownField'
DropdownField.className = styles.dropdownField
