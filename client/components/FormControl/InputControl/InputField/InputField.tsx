import { Input, mergeClasses, Textarea } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import _ from 'underscore'
import { Field } from '../../Field'
import styles from './InputField.module.scss'
import { IInputFieldProps } from './types'
import { useInputField } from './useInputField'
import React from 'react'

/**
 * A reusable component that renders a input field. If the specified
 * `rows` is greater than 1, a `Textarea` will be rendered, otherwise, an
 * `Input` will be rendered with the specified `type`.
 *
 * @returns A React component that renders an uncontrolled text input field.
 */
export const InputField: ReusableComponent<IInputFieldProps> = (props) => {
  const { onKeyDown } = useInputField(props)
  return (
    <Field
      className={InputField.className}
      {..._.pick(props, 'name', 'label', 'description', 'required', 'hidden')}
    >
      {props.rows > 1 ? (
        <Textarea
          className={mergeClasses(styles.input, props.className)}
          {..._.pick(
            props,
            'id',
            'placeholder',
            'value',
            'defaultValue',
            'onChange',
            'disabled',
            'minLength',
            'maxLength',
            'rows',
            'onBlur'
          )}
          style={props.styles?.input}
        />
      ) : (
        <Input
          className={mergeClasses(styles.input, props.className)}
          {..._.pick(
            props,
            'id',
            'className',
            'placeholder',
            'type',
            'value',
            'defaultValue',
            'onChange',
            'disabled',
            'minLength',
            'maxLength',
            'onBlur',
            'contentBefore',
            'contentAfter'
          )}
          style={props.styles?.input}
          onKeyDown={onKeyDown}
        />
      )}
    </Field>
  )
}

InputField.displayName = 'InputField'
InputField.className = styles.inputField
InputField.defaultProps = {
  rows: 1
}
