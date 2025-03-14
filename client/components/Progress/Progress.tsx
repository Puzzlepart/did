import { Field, ProgressBar } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { getFluentIcon } from 'utils'
import styles from './Progress.module.scss'
import { IProgressProps } from './types'

/**
 * @category Reusable Component
 */
export const Progress: ReusableComponent<IProgressProps> = (props) => {
  if (!props.text) return null
  return (
    <div
      className={Progress.className}
      style={{ width: props.width, padding: props.padding }}
      hidden={props.hidden}
    >
      <div className={styles.container}>
        <div hidden={!props.iconName} className={styles.icon}>
          {getFluentIcon(props.iconName, { size: 30, bundle: false })}
        </div>
        <Field
          label={props.label}
          hint={props.text}
          className={styles.progress}
        >
          <ProgressBar />
        </Field>
      </div>
    </div>
  )
}

Progress.displayName = 'Progress'
Progress.className = styles.progress
Progress.defaultProps = {
  padding: '10px 0',
  width: '100%'
}
