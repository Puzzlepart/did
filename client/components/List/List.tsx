import { SelectionMode, ShimmeredDetailsList } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import { ColumnHeaderContextMenu } from './ColumnHeaderContextMenu'
import { ListContext } from './context'
import { EmptyMessage } from './EmptyMessage'
import styles from './List.module.scss'
import { ListFilterPanel } from './ListFilterPanel'
import { IListProps } from './types'
import { useList } from './useList'
import { ViewColumnsPanel } from './ViewColumnsPanel'

/**
 * List component using  `<ShimmeredDetailsList />` from `@fluentui/react`.
 *
 * Supports list groups, filters, group by,
 * selection, search box and custom column headers.
 *
 * @category Reusable Component
 */
export const List: ReusableComponent<IListProps> = (props) => {
  const { listProps, context } = useList(props)
  return (
    <div className={List.className} hidden={props.hidden}>
      <ListContext.Provider value={context}>
        <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
          <ShimmeredDetailsList {...listProps} />
          <EmptyMessage items={listProps.items} />
          <ColumnHeaderContextMenu />
          <ListFilterPanel />
          <ViewColumnsPanel />
        </ScrollablePaneWrapper>
      </ListContext.Provider>
    </div>
  )
}

List.displayName = 'List'
List.className = styles.list
List.defaultProps = {
  items: [],
  columns: [],
  commandBar: {
    hidden: true,
    items: [],
    farItems: []
  },
  listGroupProps: {
    fieldName: null,
    emptyGroupName: null
  },
  defaultSearchBoxWidth: 500,
  filterValues: {},
  menuItems: [],
  getColumnStyle: () => ({}),
  minmalHeaderColumns: true,
  selectionProps: [SelectionMode.none],
  setKey: List.displayName
}
