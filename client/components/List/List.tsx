import {
  Checkbox,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Skeleton,
  SkeletonItem,
  mergeClasses,
  tokens
} from '@fluentui/react-components'
import { ChevronDown20Regular, ChevronRight20Regular } from '@fluentui/react-icons'
import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
  TreeGridRowOnOpenChangeData
} from '@fluentui-contrib/react-tree-grid'
import { ReusableComponent } from 'components/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getFluentIcon } from 'utils/getFluentIcon'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import { ListContext } from './context'
import { EmptyMessage } from './EmptyMessage'
import { ItemColumn } from './ItemColumn'
import styles from './List.module.scss'
import { ListFilterPanel } from './ListFilterPanel'
import {
  CheckboxVisibility,
  IListColumn,
  IListProps,
  SelectionMode
} from './types'
import { useList } from './useList'
import { useListGroups } from './useListGroups'
import { SET_SORT } from './reducer'
import { SearchBox as ListSearchBox } from './ListHeader/SearchBox'
import { ListToolbar } from './ListHeader/ListToolbar'
import { ViewColumnsPanel } from './ViewColumnsPanel'

/**
 * List component using `<DataGrid />` and `<TreeGrid />` from Fluent UI v9.
 *
 * Supports list groups, filters, group by,
 * selection, search box and custom column headers.
 *
 * @category Reusable Component
 */
export const List: ReusableComponent<IListProps> = (props) => {
  const { context, columns, items } = useList(props)
  const [groups] = useListGroups(context)
  const isGrouped = groups.length > 0
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  )
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const selectionMode = props.selectionProps?.[0] ?? SelectionMode.none
  const onSelectionChanged = props.selectionProps?.[1]
  const checkboxVisibility =
    props.checkboxVisibility ?? CheckboxVisibility.onHover

  const getRowId = useCallback(
    (item: any, index: number) =>
      props.getKey?.(item, index) ?? item?.id ?? index,
    [props.getKey]
  )

  const itemMeta = useMemo(() => {
    const meta = new Map<any, { rowId: string | number; index: number }>()
    for (const [index, item] of items.entries()) {
      meta.set(item, { rowId: getRowId(item, index), index })
    }
    return meta
  }, [items, getRowId])

  const itemsById = useMemo(() => {
    const map = new Map<string | number, any>()
    for (const [item, value] of itemMeta.entries()) {
      map.set(value.rowId, item)
    }
    return map
  }, [itemMeta])

  const allRowIds = useMemo(
    () => Array.from(itemsById.keys()),
    [itemsById]
  )

  const updateSelection = useCallback(
    (nextSelectedRowIds: Set<string | number>) => {
      setSelectedRowIds(nextSelectedRowIds)
      if (!onSelectionChanged) return
      const selectedItems = Array.from(nextSelectedRowIds)
        .map((id) => itemsById.get(id))
        .filter(Boolean)
      onSelectionChanged(
        selectionMode === SelectionMode.single ? selectedItems[0] : selectedItems
      )
    },
    [itemsById, onSelectionChanged, selectionMode]
  )

  useEffect(() => {
    if (selectionMode === SelectionMode.none) return
    const next = new Set(
      Array.from(selectedRowIds).filter((id) => itemsById.has(id))
    )
    if (next.size !== selectedRowIds.size) {
      updateSelection(next)
    }
  }, [itemsById, selectedRowIds, selectionMode, updateSelection])

  useEffect(() => {
    if (selectionMode === SelectionMode.none) return
    updateSelection(new Set())
  }, [props.setKey, selectionMode, updateSelection])

  const toggleRowSelection = useCallback(
    (rowId: string | number) => {
      const next = new Set(selectedRowIds)
      if (selectionMode === SelectionMode.single) {
        if (next.has(rowId)) {
          next.clear()
        } else {
          next.clear()
          next.add(rowId)
        }
      } else if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      updateSelection(next)
    },
    [selectedRowIds, selectionMode, updateSelection]
  )

  const shouldShowSelectionColumn =
    selectionMode !== SelectionMode.none &&
    checkboxVisibility !== CheckboxVisibility.hidden

  const handleRowClick = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      rowId: string | number
    ) => {
      const target = event.target as HTMLElement
      if (
        target.closest(
          'button, a, input, textarea, select, [role="button"], [role="link"]'
        )
      ) {
        return
      }
      if (selectionMode !== SelectionMode.none) {
        toggleRowSelection(rowId)
      }
    },
    [selectionMode, toggleRowSelection]
  )

  const handleRowDoubleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, item: any) => {
      const target = event.target as HTMLElement
      if (
        target.closest(
          'button, a, input, textarea, select, [role="button"], [role="link"]'
        )
      ) {
        return
      }
      props.onItemInvoked?.(item)
    },
    [props.onItemInvoked]
  )

  const getSortDirection = useCallback(
    (column: IListColumn) => {
      if (!context.state.sortOpts) return null
      if (context.state.sortOpts[0] !== column.fieldName) return null
      return context.state.sortOpts[1]
    },
    [context.state.sortOpts]
  )

  const handleHeaderClick = useCallback(
    (column: IListColumn) => {
      if (!column.data?.isSortable) return
      const currentDirection = getSortDirection(column)
      if (currentDirection === 'desc') {
        context.dispatch(SET_SORT({ column, direction: 'desc' }))
        return
      }
      context.dispatch(
        SET_SORT({
          column,
          direction: currentDirection === 'asc' ? 'desc' : 'asc'
        })
      )
    },
    [context, getSortDirection]
  )

  const renderHeaderCellContent = useCallback(
    (column: IListColumn) => {
      const sortDirection = getSortDirection(column)
      const content = column.data?.onRenderColumnHeader
        ? column.data.onRenderColumnHeader({
            column,
            className: styles.headerText,
            sortDirection
          })
        : column.name
      const sortIcon =
        sortDirection === 'asc'
          ? getFluentIcon('ArrowSortUp', { size: 12 })
          : (sortDirection === 'desc'
          ? getFluentIcon('ArrowSortDown', { size: 12 })
          : null)
      return (
        <div
          className={mergeClasses(
            styles.headerContent,
            column.data?.isSortable && styles.headerSortable
          )}
        >
          {content}
          {sortIcon && <span className={styles.sortIcon}>{sortIcon}</span>}
        </div>
      )
    },
    [getSortDirection]
  )

  const dataGridColumns = useMemo(() => {
    const selectionColumn = shouldShowSelectionColumn
      ? [
          {
            columnId: 'selection',
            renderHeaderCell: () => {
              if (selectionMode !== SelectionMode.multiple) return null
              const allSelected =
                allRowIds.length > 0 &&
                allRowIds.every((id) => selectedRowIds.has(id))
              const someSelected = allRowIds.some((id) =>
                selectedRowIds.has(id)
              )
              return (
                <Checkbox
                  checked={allSelected}
                  indeterminate={!allSelected && someSelected}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(_event, data) => {
                    updateSelection(
                      data.checked ? new Set(allRowIds) : new Set()
                    )
                  }}
                />
              )
            },
            renderCell: (item: any) => {
              const rowId = itemMeta.get(item)?.rowId ?? getRowId(item, 0)
              return (
                <Checkbox
                  checked={selectedRowIds.has(rowId)}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(_event, data) => {
                    if (!data.checked) {
                      const next = new Set(selectedRowIds)
                      next.delete(rowId)
                      updateSelection(next)
                      return
                    }
                    const next = new Set(selectedRowIds)
                    if (selectionMode === SelectionMode.single) {
                      next.clear()
                    }
                    next.add(rowId)
                    updateSelection(next)
                  }}
                />
              )
            }
          }
        ]
      : []
    const listColumns = columns.map((column) => ({
      columnId: column.key,
      renderHeaderCell: () => renderHeaderCellContent(column),
      renderCell: (item: any) => (
        <ItemColumn
          item={item}
          column={column}
          index={itemMeta.get(item)?.index ?? 0}
        />
      ),
      column
    }))
    return [...selectionColumn, ...listColumns]
  }, [
    allRowIds,
    columns,
    getRowId,
    itemMeta,
    renderHeaderCellContent,
    selectedRowIds,
    selectionMode,
    shouldShowSelectionColumn,
    updateSelection
  ])

  const hasMenuItems =
    typeof props.menuItems === 'function'
      ? true
      : (props.menuItems ?? []).length > 0
  const hasCommandBarItems =
    (props.commandBar?.items?.length ?? 0) > 0 ||
    (props.commandBar?.farItems?.length ?? 0) > 0
  const showToolbar =
    !props.hideToolbar &&
    (props.searchBox || hasMenuItems || hasCommandBarItems)

  const headerClassName = styles.header

  return (
    <div
      className={mergeClasses(
        List.className,
        props.className,
        props.minmalHeaderColumns && styles.minimalHeaderColumns
      )}
      hidden={props.hidden}
    >
      <ListContext.Provider value={context}>
        <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
          {showToolbar && (
            <div className={headerClassName}>
              {props.searchBox?.fullWidth && (
                <ListSearchBox {...props.searchBox} />
              )}
              <ListToolbar />
            </div>
          )}
          {props.enableShimmer ? (
            <Skeleton className={styles.skeleton}>
              {Array.from({
                length: Math.max(3, Math.min(items.length, 8))
              }).map((_, rowIndex) => (
                <div key={`skeleton-row-${rowIndex}`} className={styles.skeletonRow}>
                  {Array.from({
                    length: Math.max(columns.length, 3)
                  }).map((_, colIndex) => (
                    <SkeletonItem
                      key={`skeleton-cell-${rowIndex}-${colIndex}`}
                      className={styles.skeletonCell}
                    />
                  ))}
                </div>
              ))}
            </Skeleton>
          ) : (isGrouped ? (
            <TreeGrid className={styles.treeGrid}>
              <TreeGridRow className={styles.treeGridHeaderRow}>
                {columns.map((column) => (
                  <TreeGridCell
                    key={column.key}
                    header
                    className={mergeClasses(
                      styles.treeGridHeaderCell,
                      props.columnHeaderProps?.className
                    )}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth
                    }}
                  >
                    {renderHeaderCellContent(column)}
                  </TreeGridCell>
                ))}
              </TreeGridRow>
              {groups.map((group) => {
                const isOpen = openGroups[group.key] ?? true
                const holiday = group.data?.holiday
                const total = group.data?.total
                return (
                  <TreeGridRow
                    key={group.key}
                    open={isOpen}
                    onOpenChange={(
                      _event,
                      data: TreeGridRowOnOpenChangeData
                    ) => {
                      setOpenGroups((prev) => ({
                        ...prev,
                        [group.key]: data.open
                      }))
                    }}
                    subtree={
                      <>
                        {group.items.map((item, index) => {
                          const rowId =
                            itemMeta.get(item)?.rowId ?? getRowId(item, index)
                          return (
                            <TreeGridRow
                              key={rowId}
                              onDoubleClick={(event) =>
                                handleRowDoubleClick(event, item)
                              }
                              className={styles.treeGridRow}
                            >
                              {columns.map((column) => (
                                <TreeGridCell
                                  key={`${rowId}-${column.key}`}
                                  className={mergeClasses(
                                    styles.treeGridCell,
                                    column.className
                                  )}
                                  style={{
                                    minWidth: column.minWidth,
                                    maxWidth: column.maxWidth
                                  }}
                                >
                                  <ItemColumn
                                    item={item}
                                    column={column}
                                    index={itemMeta.get(item)?.index ?? index}
                                  />
                                </TreeGridCell>
                              ))}
                            </TreeGridRow>
                          )
                        })}
                      </>
                    }
                    className={styles.groupHeaderRow}
                    title={holiday?.name}
                  >
                    {isOpen ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
                    <TreeGridCell
                      header
                      aria-colspan={columns.length}
                      className={styles.groupHeaderCell}
                      style={{
                        color: holiday ? tokens.colorPaletteRedForeground1 : undefined,
                        ...group.data?.styles
                      }}
                    >
                      <span>{group.name}</span>
                      {total && (
                        <span className={styles.groupHeaderTotal}>{total}</span>
                      )}
                    </TreeGridCell>
                  </TreeGridRow>
                )
              })}
            </TreeGrid>
          ) : (
            <DataGrid
              items={items}
              columns={dataGridColumns}
              getRowId={getRowId}
              className={styles.dataGrid}
            >
              <DataGridHeader>
                <DataGridRow className={styles.dataGridHeaderRow}>
                  {({ renderHeaderCell, columnId, column }) => {
                    const columnMeta = (column as { column?: IListColumn })
                      ?.column
                    return (
                      <DataGridHeaderCell
                        key={columnId}
                        className={mergeClasses(
                          styles.headerCell,
                          props.columnHeaderProps?.className,
                          columnMeta?.className
                        )}
                        style={{
                          minWidth: columnMeta?.minWidth,
                          maxWidth: columnMeta?.maxWidth
                        }}
                        onClick={() =>
                          columnMeta && handleHeaderClick(columnMeta)
                        }
                      >
                        {renderHeaderCell()}
                      </DataGridHeaderCell>
                    )
                  }}
                </DataGridRow>
              </DataGridHeader>
              <DataGridBody>
                {({ item, rowId }) => (
                  <DataGridRow
                    key={rowId}
                    className={mergeClasses(
                      styles.dataGridRow,
                      checkboxVisibility === CheckboxVisibility.onHover &&
                        styles.selectionHover
                    )}
                    onClick={(event) => handleRowClick(event, rowId)}
                    onDoubleClick={(event) =>
                      handleRowDoubleClick(event, item)
                    }
                  >
                    {({ renderCell, columnId, column }) => {
                      const columnMeta = (column as { column?: IListColumn })
                        ?.column
                      const isSelectionColumn = columnId === 'selection'
                      return (
                        <DataGridCell
                          className={mergeClasses(
                            styles.cell,
                            isSelectionColumn && styles.selectionCell,
                            isSelectionColumn &&
                              checkboxVisibility === CheckboxVisibility.onHover &&
                              styles.selectionCellHover,
                            columnMeta?.className
                          )}
                          style={{
                            minWidth: columnMeta?.minWidth,
                            maxWidth: columnMeta?.maxWidth
                          }}
                        >
                          {renderCell(item)}
                        </DataGridCell>
                      )
                    }}
                  </DataGridRow>
                )}
              </DataGridBody>
            </DataGrid>
          ))}
          <EmptyMessage items={items} error={props.error} />
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
  checkboxVisibility: CheckboxVisibility.onHover,
  selectionProps: [SelectionMode.none],
  setKey: List.displayName
}
