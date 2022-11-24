import { TextField } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'underscore'
import styles from './TextControl.module.scss'
import { ITextControlProps } from './types'
import { useTextControlChange } from './useTextControlChange'

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
      <TextField
        {...props}
        onChange={onChange}
        onRenderDescription={(props) => (
          <div className={styles.description}>
            <ReactMarkdown>{props.description}</ReactMarkdown>
          </div>
        )}
        value={props.model.value<string>(props.name, '')}
      />
    </div>
  )
}

export * from './types'
