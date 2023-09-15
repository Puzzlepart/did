import { Dropdown } from '@fluentui/react'
import React from 'react'
import _ from 'underscore'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './DropdownControl.module.scss'
import { IDropdownControlProps } from './types'

/**
 * Text field based on `<Dropdown />` from [@fluentui/react](@fluentui/react)
 *
 * @category Reusable Component
 */
export const DropdownControl: FormInputControlComponent<IDropdownControlProps> =
  (props) => {
    return (
      <Field className={DropdownControl.className} {...props}>
        <Dropdown
          {..._.omit(props, 'label')}
          onChange={(_event, option) => {
            props.model.set(props.name, option[props.setValue || 'key'])
          }}
          defaultSelectedKey={props.model.value(props.name) as string}
        />
      </Field>
    )
  }

DropdownControl.displayName = 'DropdownControl'
DropdownControl.className = styles.dropdownControl
