import React from 'react'
import { FormInputControlComponent } from '../types'
import { DateField } from './DateField'
import { IDateControlProps } from './types'
import { useDateControl } from './useDateControl'

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
  return <DateField {...props} onSelectDate={onChange} value={value} />
}

DateControl.displayName = 'DateControl'
DateControl.defaultProps = {
  allowTextInput: false
}
