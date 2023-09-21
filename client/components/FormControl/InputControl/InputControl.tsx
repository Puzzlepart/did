import React from 'react'
import { FormControlContext } from '../context'
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
    <FormControlContext.Consumer>
      {(context) => (
        <InputField
          {...props}
          onBlur={context.onBlurCallback}
          onChange={(event, data) => onChange(event, data.value)}
          value={props.model?.value<string>(props.name, '')}
        />
      )}
    </FormControlContext.Consumer>
  )
}

InputControl.displayName = 'InputControl'
InputControl.defaultProps = {
  type: 'text'
}
