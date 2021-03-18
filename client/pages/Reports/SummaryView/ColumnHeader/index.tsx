/* eslint-disable tsdoc/syntax */
import { IDetailsColumnRenderTooltipProps } from 'office-ui-fabric-react'
import React from 'react'
import styles from './ColumnHeader.module.scss'

/**
 * @category List
 */
export const ColumnHeader = (
  props: IDetailsColumnRenderTooltipProps
): JSX.Element => {
  return (
    <div className={styles.root}>
      <span className={styles.name}>{props.column.name}</span>
      <span className={styles.subText}>{props.column.data?.subText}</span>
    </div>
  )
}
