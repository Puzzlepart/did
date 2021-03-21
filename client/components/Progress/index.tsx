import { Icon, ProgressIndicator } from 'office-ui-fabric-react'
import React, { FC } from 'react'
import { omit } from 'underscore'
import styles from './Progress.module.scss'
import { IProgressProps } from './types'

export const Progress: FC<IProgressProps> = (props: IProgressProps) => {
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
