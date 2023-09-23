import { Checkbox } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import { Field } from '../../Field'
import { ICheckboxFieldProps } from './types'

/**
 * Field based on `<Checkbox />` from `@fluentui/react-components`.
 *
 * @category Reusable Component
 */
export const CheckboxField: ReusableComponent<ICheckboxFieldProps> = (
  props
) => {
  return (
    <Field {...props}>
      <Checkbox {..._.pick(props, 'checked', 'onChange')} />
    </Field>
  )
}

CheckboxField.displayName = 'CheckBoxField'
