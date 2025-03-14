import React from 'react'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './UserPickerControl.module.scss'
import { IUserPickerControlProps } from './types'
import { useUserPickerControl } from './useUserPickerControl'
import { UserPicker } from './UserPicker'

/**
 * @category Reusable Component
 */
export const UserPickerControl: FormInputControlComponent<
  IUserPickerControlProps
> = (props) => {
  const { value, onChange } = useUserPickerControl(props)

  return (
    <Field
      className={`${UserPickerControl.className} ${props.className}`}
      {...props}
    >
      <UserPicker {...props} onChange={onChange} value={value} />
    </Field>
  )
}

UserPickerControl.displayName = 'LabelPickerControl'
UserPickerControl.className = styles.userPickerControl
UserPickerControl.defaultProps = {
  additionalMetadata: {}
}
