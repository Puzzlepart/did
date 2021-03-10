/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tsdoc/syntax */
import React, { FunctionComponent } from 'react'
import styles from './VisualGap.module.scss'

/**
 * @category Function Component
 */
export const VisualGap: FunctionComponent<{
  from: Date
  to: Date
}> = ({ from, to }): JSX.Element => {
  if (!from || !to) return null
  const gap = (new Date(to).getTime() - new Date(from).getTime()) / 1000 / 60
  return (
    <div className={styles.root}>
      <div className={styles.line}></div>
      <div className={styles.gap}>{gap}min</div>
    </div>
  )
}
