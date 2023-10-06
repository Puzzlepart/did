import React from 'react'
import { FormControlContext } from '../context'
import { FormInputControlComponent } from '../types'
import { InputField } from './InputField'
import { IInputControlProps } from './types'
import { useInputControl } from './useInputControl'

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const InputControl: FormInputControlComponent<IInputControlProps> = (
  props
) => {
  const { onChange, value } = useInputControl(props)
  return (
    <FormControlContext.Consumer>
      {(context) => (
        <InputField
          {...props}
          onBlur={context.onBlurCallback}
          onChange={(event, data) => onChange(event, data.value)}
          value={value}
        />
      )}
    </FormControlContext.Consumer>
  )
}

InputControl.displayName = 'InputControl'
InputControl.defaultProps = {
  type: 'text'
}
