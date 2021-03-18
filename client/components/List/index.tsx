/* eslint-disable tsdoc/syntax */
import { ShimmeredDetailsList } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import FadeIn from 'react-fade-in'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import styles from './List.module.scss'
import { IListProps } from './types'
import { useList } from './useList'

/**
 * List component using `ShimmeredDetailsList` from `office-ui-fabric-react`.
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
export const List: FunctionComponent<IListProps> = (props: IListProps) => {
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
