/* eslint-disable tsdoc/syntax */
import { ShimmeredDetailsList } from '@fluentui/react'
import React from 'react'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import styles from './List.module.scss'
import { IListProps } from './types'
import { useList } from './useList'

/**
 * List component using `ShimmeredDetailsList` from `@fluentui/react`.
 *
 * Supports list groups, selection, search box
 * and custom column headers.
 *
 * Used by the following components:
 *
 * * `<EventList />`
 * * `<Admin />` => `<ApiTokens />`
 * * `<Admin />` => `<Roles />`
 * * `<Admin />` => `<SummaryView />`
 * * `<Admin />` => `<Users />` => `<AddMultiplePanel />`
 * * `<Admin />` => `<Users />`
 * * `<Customers />` => `<CustomerList />`
 * * `<Projects />` => `<ProjectList />`
 * * `<Reports />`
 * * `<Timesheet />` => `<SummaryView />`
 *
 * @category Function Component
 */
export const List: React.FC<IListProps> = (props) => {
  const { listProps } = useList({ props })
  return (
    <div className={styles.root} hidden={props.hidden}>
      <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
        <ShimmeredDetailsList {...listProps} />
      </ScrollablePaneWrapper>
    </div>
  )
}

export * from './types'
export * from './useList'
export * from './useListGroups'
export * from './useListProps'

