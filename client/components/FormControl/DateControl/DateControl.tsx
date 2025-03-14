import React from 'react'
import { FormInputControlComponent } from '../types'
import { DateField } from './DateField'
import { IDateControlProps } from './types'
import { useDateControl } from './useDateControl'
import { FormControlContext } from '../context'

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const DateControl: FormInputControlComponent<IDateControlProps> = (
  props
) => {
  const { onChange, value } = useDateControl(props)
  return (
    <FormControlContext.Consumer>
      {(context) => (
        <DateField
          {...props}
          onSelectDate={onChange}
          onBlur={context.onBlurCallback}
          value={value}
        />
      )}
    </FormControlContext.Consumer>
  )
}

DateControl.displayName = 'DateControl'
DateControl.defaultProps = {
  allowTextInput: false
}
