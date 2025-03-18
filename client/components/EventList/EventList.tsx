import { List } from 'components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import { IEventListProps } from './types'
import { useColumns } from './useColumns'

/**
 * Renders events in a list using `<List />` component
 *
 * Supports property `additionalColumns` to add custom columns to the list.
 *
 * @category Reusable Component
 */
export const EventList: ReusableComponent<IEventListProps> = (props) => {
  const columns = useColumns(props)
  return (
    <div hidden={props.hidden}>
      <List
        {..._.pick(
          props,
          'items',
          'hideToolbar',
          'hideEmptyMessage',
          'enableShimmer',
          'listGroupProps',
          'menuItems',
          'searchBox',
          'styles',
          'emptyMessage'
        )}
        columns={columns}
      />
    </div>
  )
}

EventList.displayName = 'EventList'
EventList.defaultProps = {
  useTimeColumn: true,
  additionalColumns: [],
  durationColumn: {}
}
