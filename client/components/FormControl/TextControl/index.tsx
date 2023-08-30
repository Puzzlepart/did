import { Label, Textarea } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './TextControl.module.scss'
import { ITextControlProps, ITextFieldProps } from './types'
import { useTextControlChange } from './useTextControlChange'

/**
 * A reusable component for an `<Textarea />` from `@fluentui/react-components`
 * with a label and description with support for markdown.
 *
 * @returns A React component that renders an uncontrolled text input field.
 */
export const TextField: ReusableComponent<ITextFieldProps> = (props) => {
  return (
    <div className={styles.root} hidden={props.hidden}>
      <div>
        <Label weight='semibold'>{props.label}</Label>
      </div>
      <Textarea {...props} className={styles.field} />
      <div className={styles.description}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const TextControl: ReusableComponent<ITextControlProps> = (props) => {
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
