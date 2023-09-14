import { Label, Switch } from '@fluentui/react-components'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'underscore'
import { FormInputControlComponent } from '../types'
import styles from './SwitchControl.module.scss'
import { ISwitchControlProps } from './types'
import { useToggleControlChange } from './useToggleControlChange'

/**
 * Text field based on `<Switch />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const SwitchControl: FormInputControlComponent<ISwitchControlProps> = (
  props
) => {
  const onChange = useToggleControlChange(props)
  return (
    <div className={SwitchControl.className} hidden={props.hidden}>
      <Label weight={props.labelWeight}>{props.label}</Label>
      <Switch
        {..._.omit(props, 'label', 'labelWeight')}
        onChange={(event, data) => onChange(event, data.checked)}
        checked={props.model.value<boolean>(props.name, false)}
      />
      <div className={styles.description}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

SwitchControl.displayName = 'SwitchControl'
SwitchControl.className = styles.switchControl
SwitchControl.defaultProps = {
  labelWeight: 'semibold'
}

export * from './types'
