import { Caption2Strong, Text } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './ColumnHeader.module.scss'
import { IColumnHeaderProps } from './types'

/**
 * @category List
 */
export const ColumnHeader: StyledComponent<IColumnHeaderProps> = (props) => {
  return (
    <div className={ColumnHeader.className}>
      <div className={`${styles.container} ${props.hostClassName}`}>
        <Text weight='semibold' size={props.textSize}>
          {props.text}
        </Text>
        <Caption2Strong>{props.subText}</Caption2Strong>
      </div>
    </div>
  )
}

ColumnHeader.displayName = 'ColumnHeader'
ColumnHeader.className = styles.columnHeader
ColumnHeader.defaultProps = {
  subText: '',
  textSize: 400
}
