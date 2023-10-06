import { Radio, RadioGroup } from '@fluentui/react-components'
import React from 'react'
import _ from 'underscore'
import { FormControlContext } from '../context'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import { IRadioGroupControlProps } from './types'
import { useRadioGroupControl } from './useRadioGroupControl'

/**
 * Field based on `<RadioGroup />` from [@fluentui/react-components](@fluentui/react-components)
 *
 * @category Reusable Component
 */
export const RadioGroupControl: FormInputControlComponent<
  IRadioGroupControlProps
> = (props) => {
  const { value, onChange } = useRadioGroupControl(props)
  return (
    <FormControlContext.Consumer>
      {() => (
        <Field {...props}>
          <RadioGroup name={props.name} value={value} onChange={onChange}>
            {_.map(props.values, (v, index) => (
              <Radio {...v} key={index} />
            ))}
          </RadioGroup>
        </Field>
      )}
    </FormControlContext.Consumer>
  )
}

RadioGroupControl.displayName = 'RadioGroupControl'
