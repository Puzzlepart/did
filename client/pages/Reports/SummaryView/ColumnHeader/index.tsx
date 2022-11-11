import { IDetailsColumnRenderTooltipProps } from '@fluentui/react'
import { SubText } from 'components'
import React, { FC } from 'react'
import styles from './ColumnHeader.module.scss'

/**
 * @category List
 */
export const ColumnHeader: FC<IDetailsColumnRenderTooltipProps> = (
  props
) => {
  return (
    <div className={styles.root}>
      <div className={`${styles.container} ${props.hostClassName}`}>
        <h5 className={styles.name}>{props.column.name}</h5>
        <SubText style={{ marginTop: -24 }} text={props.column.data?.subText} />
      </div>
    </div>
  )
}
