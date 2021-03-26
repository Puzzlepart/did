/* eslint-disable tsdoc/syntax */
import { List } from 'components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'
import { useColumns } from './useColumns'

/**
 * Renders events in a list using `<List />` component
 *
 * Supports property `additionalColumns`
 *
 * @category Reusable Component
 */
export const EventList: ReusableComponent<IEventListProps> = (props) => {
  const columns = useColumns(props)
  return (
    <div className={styles.root} hidden={props.hidden}>
      <List
        enableShimmer={props.enableShimmer}
        columns={columns}
        items={props.items}
        listGroupProps={props.listGroupProps}
        listGroupRenderProps={{ showEmptyGroups: true }}
      />
    </div>
  )
}

export * from './types'
