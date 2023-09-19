import { Field, ProgressBar } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './Progress.module.scss'
import { IProgressProps } from './types'

/**
 * @category Reusable Component
 */
export const Progress: ReusableComponent<IProgressProps> = (props) => {
  return (
    <div
      className={Progress.className}
      style={{ width: props.width, padding: props.padding }}
      hidden={props.hidden}
    >
      <Field validationMessage={props.text} validationState='none'>
        <ProgressBar />
      </Field>
    </div>
  )
}

Progress.displayName = 'Progress'
Progress.className = styles.progress
Progress.defaultProps = {
  padding: '10px 0',
  width: '100%'
}
