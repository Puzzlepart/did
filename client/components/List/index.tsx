/* eslint-disable tsdoc/syntax */
import { ShimmeredDetailsList } from '@fluentui/react'
import React from 'react'
import FadeIn from 'react-fade-in'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import styles from './List.module.scss'
import { IListProps } from './types'
import { useList } from './useList'

/**
 * List component using `ShimmeredDetailsList` from `office-ui-fabric-react`.
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
  const { delay, transitionDuration, listProps } = useList({ props })
  return (
    <div className={styles.root} hidden={props.hidden}>
      <FadeIn delay={delay} transitionDuration={transitionDuration}>
        <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
          <ShimmeredDetailsList {...listProps} />
        </ScrollablePaneWrapper>
      </FadeIn>
    </div>
  )
}

export * from './types'
export * from './useList'
export * from './useListGroups'
export * from './useListProps'
