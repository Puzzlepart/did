import { Icon, ProgressIndicator } from '@fluentui/react-react'
import React from 'react'
import { omit } from 'underscore'
import styles from './Progress.module.scss'
import { IProgressProps } from './types'

export const Progress: React.FC<IProgressProps> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.progress}>
        <Icon className={styles.icon} {...props.iconProps} />
        <ProgressIndicator
          className={styles.indicator}
          {...omit(props, 'iconProps')}
        />
      </div>
    </div>
  )
}
