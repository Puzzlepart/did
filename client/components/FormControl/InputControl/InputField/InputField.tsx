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
      label={props.label}
      description={props.description}
      required={props.required}
      hidden={props.hidden}
    >
      {props.rows > 1 ? (
        <Textarea
          className={styles.input}
          {..._.pick(
            props,
            'placeholder',
            'value',
            'onChange',
            'disabled',
            'maxLength',
            'rows'
          )}
        />
      ) : (
        <Input
          className={styles.input}
          {..._.pick(
            props,
            'placeholder',
            'type',
            'value',
            'onChange',
            'disabled',
            'maxLength'
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
