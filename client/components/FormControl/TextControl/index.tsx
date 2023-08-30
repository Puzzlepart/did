import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'underscore'
import styles from './TextControl.module.scss'
import { ITextControlProps } from './types'
import { useTextControlChange } from './useTextControlChange'
import { Label, Textarea } from '@fluentui/react-components'

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const TextControl: ReusableComponent<ITextControlProps> = (props) => {
  const onChange = useTextControlChange(props)
  return (
    <div className={styles.root} {..._.pick(props, 'hidden')}>
      <div>
        <Label weight='semibold'>{props.label}</Label>
      </div>
      <Textarea
        {..._.omit(props, 'description')}
        className={styles.field}
        onChange={(event, data) => onChange(event, data.value)}
        value={props.model.value<string>(props.name, '')}
      />
      <div className={styles.description}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

export * from './types'
