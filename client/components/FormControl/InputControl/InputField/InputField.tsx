import { Input, Textarea } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import { Field } from '../../Field'
import styles from './InputField.module.scss'
import { IInputFieldProps } from './types'

/**
 * A reusable component that renders a input field. If the specified
 * `rows` is greater than 1, a `Textarea` will be rendered, otherwise, an
 * `Input` will be rendered with the specified `type`.
 *
 * @returns A React component that renders an uncontrolled text input field.
 */
export const InputField: ReusableComponent<IInputFieldProps> = (props) => {
  return (
    <Field
      className={InputField.className}
      {..._.pick(props, 'name', 'label', 'description', 'required', 'hidden')}
    >
      {props.rows > 1 ? (
        <Textarea
          className={styles.input}
          {..._.pick(
            props,
            'id',
            'placeholder',
            'value',
            'defaultValue',
            'onChange',
            'disabled',
            'maxLength',
            'rows',
            'onBlur'
          )}
        />
      ) : (
        <Input
          className={styles.input}
          {..._.pick(
            props,
            'id',
            'placeholder',
            'type',
            'value',
            'defaultValue',
            'onChange',
            'disabled',
            'maxLength',
            'onBlur',
            'contentBefore',
            'contentAfter'
          )}
        />
      )}
    </Field>
  )
}

InputField.className = styles.inputField
InputField.defaultProps = {
  rows: 1
}
