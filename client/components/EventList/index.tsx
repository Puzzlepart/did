/* eslint-disable tsdoc/syntax */
import { List } from 'components'
import React, { FC } from 'react'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'
import { useColumns } from './useColumns'

/**
 * @category Function Component
 */
export const EventList: FC<IEventListProps> = (props: IEventListProps) => {
  const columns = useColumns(props)
  return (
    <div className={styles.root} hidden={props.hidden}>
      <List
        enableShimmer={props.enableShimmer}
        columns={columns}
        items={props.items}
        listGroupProps={props.listGroupProps}
        listGroupRenderProps={{ showEmptyGroups: props.showEmptyDays }}
      />
    </div>
  )
}

export * from './types'
