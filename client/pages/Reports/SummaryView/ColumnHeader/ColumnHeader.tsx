import { IDetailsColumnRenderTooltipProps } from '@fluentui/react'
import { Caption2Strong, Text } from '@fluentui/react-components'
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
        <Text weight='semibold' size={400}>
          {props.column.name}
        </Text>
        <Caption2Strong>{props.column.data?.subText}</Caption2Strong>
      </div>
    </div>
  )
}

ColumnHeader.displayName = 'ColumnHeader'
ColumnHeader.className = styles.columnHeader
