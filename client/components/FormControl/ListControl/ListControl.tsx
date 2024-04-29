import React from 'react'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './ListControl.module.scss'
import { IListControlProps } from './types'
import { useListControl } from './useListControl'
import { ListInput } from './ListInput'

/**
 * @category Reusable Component
 */
export const ListControl: FormInputControlComponent<IListControlProps> = (
  props
) => {
  const { value, onChange } = useListControl(props)

  return (
    <Field className={`${ListControl.className} ${props.className}`} {...props}>
      <ListInput {...props} onChange={onChange} value={value} />
    </Field>
  )
}

ListControl.displayName = 'LabelPickerControl'
ListControl.className = styles.listControl
ListControl.defaultProps = {}
