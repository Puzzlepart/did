import { Dropdown, Option } from '@fluentui/react-components'
import React, { useMemo } from 'react'
import _ from 'underscore'
import { FormControlContext } from '../context'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import styles from './DropdownControl.module.scss'
import { IDropdownControlProps } from './types'
import { useDropdownControlChange } from './useDropdownControlChange'

/**
 * Text field based on `<Dropdown />` from [@fluentui/react](@fluentui/react)
 *
 * @category Reusable Component
 */
export const DropdownControl: FormInputControlComponent<IDropdownControlProps> =
  (props) => {
    const onChange = useDropdownControlChange(props)
    const value = useMemo(() => {
      if (props.model) {
        const modelValue = props.model.value(props.name)
        const option = _.findWhere(props.values, { value: modelValue })
        if (option && modelValue) {
          return option.text
        }
      }
      return props.defaultValue
    }, [props.defaultValue, props.model, props.name])
    return (
      <FormControlContext.Consumer>
        {(context) => (
          <Field className={DropdownControl.className} {...props}>
            <Dropdown
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              value={value}
              onOptionSelect={onChange}
              onBlur={context.onBlurCallback}
            >
              {_.map(props.values, (option, index) => (
                <Option key={index} value={option.value}>
                  {option.text}
                </Option>
              ))}
            </Dropdown>
          </Field>
        )}
      </FormControlContext.Consumer>
    )
  }

DropdownControl.displayName = 'DropdownControl'
DropdownControl.className = styles.dropdownControl
