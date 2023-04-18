import { Toggle } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'underscore'
import styles from './ToggleControl.module.scss'
import { IToggleControlProps } from './types'
import { useToggleControlChange } from './useToggleControlChange'

/**
 * Text field based on `<Toggle />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const ToggleControl: ReusableComponent<IToggleControlProps> = (
  props
) => {
  const onChange = useToggleControlChange(props)
  return (
    <div className={styles.root} {..._.pick(props, 'hidden')}>
      <Toggle
        {...props}
        onChange={onChange}
        checked={props.model.value<boolean>(props.name, false)}
      />
      <div className={styles.description}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

export * from './types'
