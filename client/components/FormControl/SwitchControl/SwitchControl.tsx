import { Switch } from '@fluentui/react-components'
import React from 'react'
import _ from 'underscore'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './SwitchControl.module.scss'
import { useToggleControlChange } from './useToggleControlChange'

/**
 * Text field based on `<Switch />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const SwitchControl: FormInputControlComponent = (props) => {
  const onChange = useToggleControlChange(props)
  return (
    <Field
      className={SwitchControl.className}
      {..._.pick(props, 'name', 'label', 'description', 'required', 'hidden')}
    >
      <Switch
        onChange={(event, data) => onChange(event, data.checked)}
        checked={props.model.value<boolean>(props.name, false)}
      />
    </Field>
  )
}

SwitchControl.displayName = 'SwitchControl'
SwitchControl.className = styles.switchControl
