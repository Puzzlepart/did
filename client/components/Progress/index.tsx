/* eslint-disable tsdoc/syntax */
import { Icon, ProgressIndicator } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _  from 'underscore'
import styles from './Progress.module.scss'
import { IProgressProps } from './types'

/**
 * @category Reusable Component
 */
export const Progress: ReusableComponent<IProgressProps> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.progress}>
        <Icon className={styles.icon} {...props.iconProps} />
        <ProgressIndicator
          className={styles.indicator}
          {..._.omit(props, 'iconProps')}
        />
      </div>
    </div>
  )
}
