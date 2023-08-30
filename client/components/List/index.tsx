import { ShimmeredDetailsList } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import { ColumnHeaderContextMenu } from './ColumnHeaderContextMenu'
import { ListContext } from './context'
import styles from './List.module.scss'
import { ListFilterPanel } from './ListFilterPanel'
import { PreviewList } from './PreviewList'
import { IListProps } from './types'
import { useList } from './useList'

/**
 * List component using `ShimmeredDetailsList` from `@fluentui/react`.
 *
 * Supports list groups, filters, group by,
 * selection, search box and custom column headers.
 *
 * @category Reusable Component
 */
export const List: ReusableComponent<IListProps> = (props) => {
  const { listProps, context } = useList(props)
  return (
    <div className={styles.root} hidden={props.hidden}>
      <ListContext.Provider value={context}>
        <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
          {props.usePreview ? (
            <PreviewList {...listProps} />
          ) : (
            <ShimmeredDetailsList {...listProps} />
          )}
          <ColumnHeaderContextMenu />
          <ListFilterPanel />
        </ScrollablePaneWrapper>
      </ListContext.Provider>
    </div>
  )
}

List.defaultProps = {
  items: [],
  columns: [],
  commandBar: {
    hidden: true,
    items: [],
    farItems: []
  },
  defaultSearchBoxWidth: 500,
  filterValues: {}
}

export * from './types'
export * from './useList'
export * from './useListGroups'
export * from './useListProps'
