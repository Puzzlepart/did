import React from 'react'
import { FormInputControlComponent } from '../types'
import { InputField } from './InputField'
import { IInputControlProps } from './types'
import { useInputControlChange } from './useInputControlChange'

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const InputControl: FormInputControlComponent<IInputControlProps> = (
  props
) => {
  const onChange = useInputControlChange(props)
  return (
    <InputField
      {...props}
      onChange={(event, data) => onChange(event, data.value)}
      value={props.model.value<string>(props.name, '')}
    />
  )
}

InputControl.displayName = 'InputControl'
InputControl.defaultProps = {
  type: 'text'
}
