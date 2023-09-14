import { Input, Label, Textarea } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { FormInputControlComponent } from '../types'
import styles from './TextControl.module.scss'
import { ITextControlProps, ITextFieldProps } from './types'
import { useTextControlChange } from './useTextControlChange'

/**
 * A reusable component that renders a text input field. If the specified
 * `rows` is greater than 1, a `Textarea` will be rendered, otherwise, an
 * `Input` will be rendered.
 *
 * @returns A React component that renders an uncontrolled text input field.
 */
export const TextField: ReusableComponent<ITextFieldProps> = (props) => {
  return (
    <div className={TextField.className} hidden={props.hidden}>
      <Label weight='semibold'>{props.label}</Label>
      {props.rows > 1 ? (
        <Textarea {...props} className={styles.field} />
      ) : (
        <Input
          value={props.value}
          onChange={props.onChange}
          className={styles.field}
          disabled={props.disabled}
        />
      )}
      <div className={styles.description} hidden={props.disabled}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

TextField.className = styles.textControl
TextField.defaultProps = {
  rows: 1
}

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const TextControl: FormInputControlComponent<ITextControlProps> = (
  props
) => {
  const onChange = useTextControlChange(props)
  return (
    <TextField
      {...props}
      onChange={(event, data) => onChange(event, data.value)}
      value={props.model.value<string>(props.name, '')}
    />
  )
}

export * from './types'
