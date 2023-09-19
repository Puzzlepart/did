import React from 'react'
import ReactMarkdown from 'react-markdown'
import { StyledComponent } from 'types'
import styles from './FieldDescription.module.scss'

/**
 * Text field based on `<Switch />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const FieldDescription: StyledComponent<{ text: string }> = (props) => (
  <div className={FieldDescription.className}>
    <ReactMarkdown>{props.text}</ReactMarkdown>
  </div>
)

FieldDescription.displayName = 'FieldDescription'
FieldDescription.className = styles.fieldDescription
FieldDescription.defaultProps = {
  text: ''
}
