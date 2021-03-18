/* eslint-disable tsdoc/syntax */
import { List } from 'components'
import React, { FunctionComponent } from 'react'
import { useColumns } from './columns'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'

/**
 * @category Function Component
 */
export const EventList: FunctionComponent<IEventListProps> = (
  props: IEventListProps
): JSX.Element => {
  const columns = useColumns(props)
  return (
    <div className={styles.root} hidden={props.hidden}>
      <List
        enableShimmer={props.enableShimmer}
        columns={columns}
        items={props.events}
        listGroupProps={props.groups}
        listGroupRenderProps={{ showEmptyGroups: props.showEmptyDays }}
      />
    </div>
  )
}

export * from './types'
