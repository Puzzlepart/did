/* eslint-disable tsdoc/syntax */
import { ShimmeredDetailsList } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import { ListContext } from './context'
import { ItemColumn } from './ItemColumn'
import styles from './List.module.scss'
import { ListHeader } from './ListHeader'
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
 * @category Reusable Component
 */
export const List: ReusableComponent<IListProps> = (props) => {
  const { listProps, state, dispatch } = useList(props)
  return (
    <div className={styles.root} hidden={props.hidden}>
      <ListContext.Provider value={{ props, state, dispatch }}>
        <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
          <ShimmeredDetailsList
            {...listProps}
            onRenderDetailsHeader={(headerProps, defaultRender) =>
              <ListHeader
                headerProps={headerProps}
                defaultRender={defaultRender} />
            }
            onRenderItemColumn={(item, index, column) => (
              <ItemColumn
                item={item}
                index={index}
                column={column} />
            )
            } />
        </ScrollablePaneWrapper>
      </ListContext.Provider>
    </div>
  )
}

List.defaultProps = {
  items: [],
  columns: [],
  commandBar: {
    items: [],
    farItems: []
  }
}

export * from './types'
export * from './useList'
export * from './useListGroups'
export * from './useListProps'

