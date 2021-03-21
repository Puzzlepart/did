/* eslint-disable tsdoc/syntax */
import { IDetailsColumnRenderTooltipProps } from 'office-ui-fabric-react'
import React, { FC } from 'react'
import styles from './ColumnHeader.module.scss'

/**
 * @category List
 */
export const ColumnHeader: FC<IDetailsColumnRenderTooltipProps> = (props) => {
  return (
    <div className={styles.root}>
      <div className={`${styles.container} ${props.hostClassName}`}>
        <div className={styles.name}>{props.column.name}</div>
        <div className={styles.subText}>{props.column.data?.subText}</div>
      </div>
    </div>
  )
}
