import { IDetailsColumnRenderTooltipProps } from '@fluentui/react'
import { SubText } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './ColumnHeader.module.scss'

/**
 * @category List
 */
export const ColumnHeader: StyledComponent<IDetailsColumnRenderTooltipProps> = (
  props
) => {
  return (
    <div className={ColumnHeader.className}>
      <div className={`${styles.container} ${props.hostClassName}`}>
        <h5 className={styles.name}>{props.column.name}</h5>
        <SubText style={{ marginTop: -24 }} text={props.column.data?.subText} />
      </div>
    </div>
  )
}

ColumnHeader.displayName = 'ColumnHeader'
ColumnHeader.className = styles.columnHeader
