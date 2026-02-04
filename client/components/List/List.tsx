import {
  Checkbox,
  DataGrid as FluentDataGrid,
  DataGridBody as FluentDataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow as FluentDataGridRow,
  Skeleton,
  SkeletonItem,
  TableColumnId,
  mergeClasses,
  tokens,
  useScrollbarWidth,
  useFluent
} from '@fluentui/react-components'
import {
  DataGrid as VirtualizedDataGrid,
  DataGridBody as VirtualizedDataGridBody,
  DataGridRow as VirtualizedDataGridRow
} from '@fluentui-contrib/react-data-grid-react-window'
import {
  ChevronDown20Regular,
  ChevronRight20Regular
} from '@fluentui/react-icons'
import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
  TreeGridRowOnOpenChangeData
} from '@fluentui-contrib/react-tree-grid'
import { ReusableComponent } from 'components/types'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
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
import { useColumnWidthPersist } from './hooks'
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
  const { t } = useTranslation()
  const { context, columns, items } = useList(props)
  const [groups] = useListGroups(context)
  const isGrouped = groups.length > 0
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  )
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const selectionMode = props.selectionProps?.[0] ?? SelectionMode.none
  const onSelectionChanged = props.selectionProps?.[1]
  const onSelectionChangedRef = useRef(onSelectionChanged)
  useEffect(() => {
    onSelectionChangedRef.current = onSelectionChanged
  }, [onSelectionChanged])
  const checkboxVisibility =
    props.checkboxVisibility ?? CheckboxVisibility.onHover
  const selectionColumnWidth = 40
  const selectionColumnMeta = useMemo<IListColumn>(
    () => ({
      key: 'selection',
      name: '',
      fieldName: '',
      minWidth: selectionColumnWidth,
      maxWidth: selectionColumnWidth,
      defaultWidth: selectionColumnWidth,
      idealWidth: selectionColumnWidth,
      isResizable: false
    }),
    [selectionColumnWidth]
  )

  // Virtualization support
  const { targetDocument } = useFluent()
  const scrollbarWidth = useScrollbarWidth({ targetDocument })
  const isVirtualized = props.virtualized && props.height && !isGrouped
  const listHeaderRef = useRef<HTMLDivElement>(null)
  const dataGridHeaderRef = useRef<HTMLDivElement>(null)
  const [virtualizedBodyHeight, setVirtualizedBodyHeight] = useState<number>()
  const rowHeight = props.rowHeight ?? 44

  // Compute row IDs and create lookup maps in a single pass
  const { itemsById, allRowIds, getItemRowId } = useMemo(() => {
    const itemsById = new Map<string | number, any>()
    const allRowIds: Array<string | number> = []

    const getItemRowId = (item: any, index: number): string | number => {
      return props.getKey?.(item, index) ?? item?.id ?? index
    }

    for (const [index, item] of items.entries()) {
      const rowId = getItemRowId(item, index)
      itemsById.set(rowId, item)
      allRowIds.push(rowId)
    }

    return { itemsById, allRowIds, getItemRowId }
  }, [items, props.getKey])

  const updateSelection = useCallback(
    (nextSelectedRowIds: Set<string | number>) => {
      setSelectedRowIds(nextSelectedRowIds)
      if (!onSelectionChangedRef.current) return
      const selectedItems = Array.from(nextSelectedRowIds)
        .map((id) => itemsById.get(id))
        .filter(Boolean)
      onSelectionChangedRef.current(
        selectionMode === SelectionMode.single
          ? selectedItems[0]
          : selectedItems
      )
    },
    [itemsById, selectionMode]
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
    setSelectedRowIds(new Set())
    onSelectionChangedRef.current?.(
      selectionMode === SelectionMode.single ? undefined : []
    )
  }, [props.setKey, selectionMode])

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
    (event: React.MouseEvent<HTMLElement>, rowId: string | number) => {
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
          : sortDirection === 'desc'
          ? getFluentIcon('ArrowSortDown', { size: 12 })
          : null
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
            compare: () => 0,
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
                  checked={allSelected ? true : someSelected ? 'mixed' : false}
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
              const index = items.indexOf(item)
              const rowId = getItemRowId(item, index)
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
            },
            column: selectionColumnMeta
          }
        ]
      : []
    const listColumns = columns.map((column) => ({
      columnId: column.key,
      renderHeaderCell: () => renderHeaderCellContent(column),
      renderCell: (item: any) => {
        const index = items.indexOf(item)
        return <ItemColumn item={item} column={column} index={index} />
      },
      compare: column.data?.isSortable
        ? (a: any, b: any) => {
            const fieldName = column.fieldName
            if (!fieldName) return 0
            const aValue = a[fieldName]
            const bValue = b[fieldName]
            if (aValue === bValue) return 0
            if (aValue === null || aValue === undefined) return 1
            if (bValue === null || bValue === undefined) return -1
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return aValue.localeCompare(bValue)
            }
            return aValue < bValue ? -1 : 1
          }
        : () => 0,
      column
    }))
    return [...selectionColumn, ...listColumns]
  }, [
    allRowIds,
    columns,
    items,
    getItemRowId,
    renderHeaderCellContent,
    selectedRowIds,
    selectionMode,
    selectionColumnMeta,
    shouldShowSelectionColumn,
    updateSelection
  ])

  // Create a map of columnId to column metadata for v9 DataGrid
  const columnMetaMap = useMemo(() => {
    const map = new Map<string, IListColumn>()
    for (const col of dataGridColumns) {
      if ((col as any).column) {
        map.set(col.columnId, (col as any).column)
      }
    }
    return map
  }, [dataGridColumns])

  const getColumnTrackSize = useCallback((column: IListColumn) => {
    const minWidth = column.minWidth ?? 100
    const maxWidth = column.maxWidth
    if (maxWidth !== null && maxWidth !== undefined) {
      return maxWidth <= minWidth
        ? `${minWidth}px`
        : `minmax(${minWidth}px, ${maxWidth}px)`
    }
    return `minmax(${minWidth}px, 1fr)`
  }, [])

  // Column resizing support
  const resizableColumns = props.resizableColumns ?? true
  const autoFitColumns = props.autoFitColumns ?? true
  const { columnSizingOptions, handleColumnResize } = useColumnWidthPersist(
    columns,
    props.persistColumnWidths
  )
  const dataGridColumnSizingOptions = useMemo(() => {
    if (!shouldShowSelectionColumn) return columnSizingOptions
    return {
      ...columnSizingOptions,
      selection: {
        minWidth: selectionColumnWidth,
        defaultWidth: selectionColumnWidth,
        idealWidth: selectionColumnWidth
      }
    }
  }, [columnSizingOptions, shouldShowSelectionColumn, selectionColumnWidth])

  const treeGridTemplateColumns = useMemo(() => {
    if (columns.length === 0) return ''
    return columns.map((column) => getColumnTrackSize(column)).join(' ')
  }, [columns, getColumnTrackSize])

  const onColumnResize = useCallback(
    (
      e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      data: { columnId: TableColumnId; width: number }
    ) => {
      handleColumnResize(e, {
        columnId: String(data.columnId),
        width: data.width
      })
      props.onColumnResize?.(e, {
        columnId: String(data.columnId),
        width: data.width
      })
    },
    [handleColumnResize, props.onColumnResize]
  )

  const dataGridStyle = useMemo(() => {
    if (autoFitColumns) return
    return { overflowX: 'auto' as React.CSSProperties['overflowX'] }
  }, [autoFitColumns])

  const treeGridStyle = useMemo(
    () =>
      treeGridTemplateColumns
        ? ({
            '--list-grid-template': treeGridTemplateColumns
          } as React.CSSProperties)
        : undefined,
    [treeGridTemplateColumns]
  )

  const hasGroups = isGrouped && groups.length > 0
  const allGroupsOpen =
    hasGroups && groups.every((group) => openGroups[group.key] ?? true)
  const toggleAllLabel = allGroupsOpen
    ? t('common.collapseAllGroups')
    : t('common.expandAllGroups')
  const handleToggleAllGroups = useCallback(() => {
    if (!hasGroups) return
    const nextOpen = !allGroupsOpen
    const nextGroups: Record<string, boolean> = {}
    for (const group of groups) {
      nextGroups[group.key] = nextOpen
    }
    setOpenGroups(nextGroups)
  }, [allGroupsOpen, groups, hasGroups])

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

  useLayoutEffect(() => {
    if (!isVirtualized || !props.height) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setVirtualizedBodyHeight(undefined)
      return
    }
    const toolbarHeight = showToolbar
      ? listHeaderRef.current?.getBoundingClientRect().height ?? 0
      : 0
    const gridHeaderHeight =
      dataGridHeaderRef.current?.getBoundingClientRect().height ?? 0
    const nextHeight = Math.max(
      0,
      props.height - toolbarHeight - gridHeaderHeight
    )
    setVirtualizedBodyHeight((prev) =>
      prev === nextHeight ? prev : nextHeight
    )
  }, [
    isVirtualized,
    props.height,
    showToolbar,
    dataGridColumns.length,
    props.enableShimmer
  ])

  // Helper function to render the appropriate DataGrid variant
  const renderDataGrid = () => {
    if (isVirtualized) {
      // Virtualized DataGrid for large datasets
      return (
        <VirtualizedDataGrid
          items={items}
          columns={dataGridColumns}
          getRowId={(item: any) => {
            const index = items.indexOf(item)
            return getItemRowId(item, index)
          }}
          className={styles.dataGrid}
          style={dataGridStyle}
          resizableColumns={resizableColumns}
          columnSizingOptions={dataGridColumnSizingOptions}
          onColumnResize={onColumnResize}
          resizableColumnsOptions={{ autoFitColumns }}
        >
          <DataGridHeader
            ref={dataGridHeaderRef}
            style={{ paddingRight: scrollbarWidth }}
          >
            <VirtualizedDataGridRow className={styles.dataGridHeaderRow}>
              {({ renderHeaderCell, columnId }) => {
                const columnMeta = columnMetaMap.get(String(columnId))
                const isSelectionColumn = columnId === 'selection'
                return (
                  <DataGridHeaderCell
                    key={columnId}
                    className={mergeClasses(
                      styles.headerCell,
                      props.columnHeaderProps?.className,
                      isSelectionColumn && styles.selectionCell,
                      columnMeta?.className,
                      columnMeta?.isMultiline ? styles.multiline : styles.nowrap
                    )}
                    onClick={() => columnMeta && handleHeaderClick(columnMeta)}
                  >
                    {renderHeaderCell()}
                  </DataGridHeaderCell>
                )
              }}
            </VirtualizedDataGridRow>
          </DataGridHeader>
          <VirtualizedDataGridBody<any>
            itemSize={rowHeight}
            height={virtualizedBodyHeight ?? props.height!}
          >
            {({ item, rowId }, style) => (
              <VirtualizedDataGridRow
                key={rowId}
                style={style}
                className={mergeClasses(
                  styles.dataGridRow,
                  checkboxVisibility === CheckboxVisibility.onHover &&
                    styles.selectionHover
                )}
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  handleRowClick(event, rowId)
                }
                onDoubleClick={(event: React.MouseEvent<HTMLElement>) =>
                  handleRowDoubleClick(event, item)
                }
              >
                {({ renderCell, columnId }) => {
                  const columnMeta = columnMetaMap.get(String(columnId))
                  const isSelectionColumn = columnId === 'selection'
                  const cellLabel =
                    isSelectionColumn || columnMeta?.data?.hideMobileLabel
                      ? ''
                      : columnMeta?.name ?? String(columnId)
                  return (
                    <DataGridCell
                      data-label={cellLabel}
                      data-column-id={String(columnId)}
                      className={mergeClasses(
                        styles.cell,
                        isSelectionColumn && styles.selectionCell,
                        isSelectionColumn &&
                          checkboxVisibility === CheckboxVisibility.onHover &&
                          styles.selectionCellHover,
                        columnMeta?.className,
                        columnMeta?.isMultiline
                          ? styles.multiline
                          : styles.nowrap
                      )}
                    >
                      {renderCell(item)}
                    </DataGridCell>
                  )
                }}
              </VirtualizedDataGridRow>
            )}
          </VirtualizedDataGridBody>
        </VirtualizedDataGrid>
      )
    }

    // Standard DataGrid for smaller datasets
    return (
      <FluentDataGrid
        items={items}
        columns={dataGridColumns}
        getRowId={(item: any) => {
          const index = items.indexOf(item)
          return getItemRowId(item, index)
        }}
        className={styles.dataGrid}
        style={dataGridStyle}
        resizableColumns={resizableColumns}
        columnSizingOptions={dataGridColumnSizingOptions}
        onColumnResize={onColumnResize}
        resizableColumnsOptions={{ autoFitColumns }}
      >
        <DataGridHeader>
          <FluentDataGridRow className={styles.dataGridHeaderRow}>
            {({ renderHeaderCell, columnId }) => {
              const columnMeta = columnMetaMap.get(String(columnId))
              const isSelectionColumn = columnId === 'selection'
              return (
                <DataGridHeaderCell
                  key={columnId}
                  className={mergeClasses(
                    styles.headerCell,
                    props.columnHeaderProps?.className,
                    isSelectionColumn && styles.selectionCell,
                    columnMeta?.className,
                    columnMeta?.isMultiline ? styles.multiline : styles.nowrap
                  )}
                  onClick={() => columnMeta && handleHeaderClick(columnMeta)}
                >
                  {renderHeaderCell()}
                </DataGridHeaderCell>
              )
            }}
          </FluentDataGridRow>
        </DataGridHeader>
        <FluentDataGridBody>
          {({ item, rowId }) => (
            <FluentDataGridRow
              key={rowId}
              className={mergeClasses(
                styles.dataGridRow,
                checkboxVisibility === CheckboxVisibility.onHover &&
                  styles.selectionHover
              )}
              onClick={(event) => handleRowClick(event, rowId)}
              onDoubleClick={(event) => handleRowDoubleClick(event, item)}
            >
              {({ renderCell, columnId }) => {
                const columnMeta = columnMetaMap.get(String(columnId))
                const isSelectionColumn = columnId === 'selection'
                const cellLabel =
                  isSelectionColumn || columnMeta?.data?.hideMobileLabel
                    ? ''
                    : columnMeta?.name ?? String(columnId)
                return (
                  <DataGridCell
                    data-label={cellLabel}
                    data-column-id={String(columnId)}
                    className={mergeClasses(
                      styles.cell,
                      isSelectionColumn && styles.selectionCell,
                      isSelectionColumn &&
                        checkboxVisibility === CheckboxVisibility.onHover &&
                        styles.selectionCellHover,
                      columnMeta?.className,
                      columnMeta?.isMultiline ? styles.multiline : styles.nowrap
                    )}
                  >
                    {renderCell(item)}
                  </DataGridCell>
                )
              }}
            </FluentDataGridRow>
          )}
        </FluentDataGridBody>
      </FluentDataGrid>
    )
  }

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
        {isVirtualized ? (
          <div
            style={{
              position: 'relative',
              height: props.height,
              overflowX: autoFitColumns ? 'hidden' : 'auto',
              overflowY: 'hidden'
            }}
          >
            {showToolbar && (
              <div ref={listHeaderRef} className={headerClassName}>
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
                  <div
                    key={`skeleton-row-${rowIndex}`}
                    className={styles.skeletonRow}
                  >
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
            ) : isGrouped ? (
              <TreeGrid className={styles.treeGrid} style={treeGridStyle}>
                <TreeGridRow className={styles.treeGridHeaderRow}>
                  {columns.map((column, index) => (
                    <TreeGridCell
                      key={column.key}
                      header
                      className={mergeClasses(
                        styles.treeGridHeaderCell,
                        props.columnHeaderProps?.className,
                        column.isMultiline ? styles.multiline : styles.nowrap
                      )}
                      style={{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width:
                          column.minWidth === column.maxWidth
                            ? column.minWidth
                            : undefined,
                        flex:
                          column.minWidth === column.maxWidth
                            ? undefined
                            : '1 1 auto'
                      }}
                    >
                      <div className={styles.treeGridHeaderContent}>
                        {index === 0 && hasGroups && (
                          <button
                            type='button'
                            className={styles.treeGridToggleAllButton}
                            onClick={(event) => {
                              event.stopPropagation()
                              handleToggleAllGroups()
                            }}
                            aria-label={toggleAllLabel}
                            title={toggleAllLabel}
                          >
                            {allGroupsOpen ? (
                              <ChevronDown20Regular />
                            ) : (
                              <ChevronRight20Regular />
                            )}
                          </button>
                        )}
                        {renderHeaderCellContent(column)}
                      </div>
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
                          {group.items.map((item, _groupIndex) => {
                            const itemIndex = items.indexOf(item)
                            const rowId = getItemRowId(item, itemIndex)
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
                                    data-label={
                                      column.data?.hideMobileLabel
                                        ? ''
                                        : column.name
                                    }
                                    data-column-id={column.key}
                                    className={mergeClasses(
                                      styles.treeGridCell,
                                      column.className,
                                      column.isMultiline
                                        ? styles.multiline
                                        : styles.nowrap
                                    )}
                                    style={{
                                      minWidth: column.minWidth,
                                      maxWidth: column.maxWidth,
                                      width:
                                        column.minWidth === column.maxWidth
                                          ? column.minWidth
                                          : undefined,
                                      flex:
                                        column.minWidth === column.maxWidth
                                          ? undefined
                                          : '1 1 auto'
                                    }}
                                  >
                                    <ItemColumn
                                      item={item}
                                      column={column}
                                      index={itemIndex}
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
                      {isOpen ? (
                        <ChevronDown20Regular />
                      ) : (
                        <ChevronRight20Regular />
                      )}
                      <TreeGridCell
                        header
                        aria-colspan={columns.length}
                        className={styles.groupHeaderCell}
                        style={{
                          color: holiday
                            ? tokens.colorPaletteRedForeground1
                            : undefined,
                          ...group.data?.styles
                        }}
                      >
                        <span>{group.name}</span>
                        {total && (
                          <span className={styles.groupHeaderTotal}>
                            ({total})
                          </span>
                        )}
                      </TreeGridCell>
                    </TreeGridRow>
                  )
                })}
              </TreeGrid>
            ) : (
              renderDataGrid()
            )}
            <EmptyMessage items={items} error={props.error} />
            <ListFilterPanel />
            <ViewColumnsPanel />
          </div>
        ) : (
          <ScrollablePaneWrapper
            condition={!!props.height}
            height={props.height}
          >
            {showToolbar && (
              <div ref={listHeaderRef} className={headerClassName}>
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
                  <div
                    key={`skeleton-row-${rowIndex}`}
                    className={styles.skeletonRow}
                  >
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
            ) : isGrouped ? (
              <TreeGrid className={styles.treeGrid} style={treeGridStyle}>
                <TreeGridRow className={styles.treeGridHeaderRow}>
                  {columns.map((column, index) => (
                    <TreeGridCell
                      key={column.key}
                      header
                      className={mergeClasses(
                        styles.treeGridHeaderCell,
                        props.columnHeaderProps?.className,
                        column.isMultiline ? styles.multiline : styles.nowrap
                      )}
                      style={{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width:
                          column.minWidth === column.maxWidth
                            ? column.minWidth
                            : undefined,
                        flex:
                          column.minWidth === column.maxWidth
                            ? undefined
                            : '1 1 auto'
                      }}
                    >
                      <div className={styles.treeGridHeaderContent}>
                        {index === 0 && hasGroups && (
                          <button
                            type='button'
                            className={styles.treeGridToggleAllButton}
                            onClick={(event) => {
                              event.stopPropagation()
                              handleToggleAllGroups()
                            }}
                            aria-label={toggleAllLabel}
                            title={toggleAllLabel}
                          >
                            {allGroupsOpen ? (
                              <ChevronDown20Regular />
                            ) : (
                              <ChevronRight20Regular />
                            )}
                          </button>
                        )}
                        {renderHeaderCellContent(column)}
                      </div>
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
                          {group.items.map((item, _groupIndex) => {
                            const itemIndex = items.indexOf(item)
                            const rowId = getItemRowId(item, itemIndex)
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
                                    data-label={
                                      column.data?.hideMobileLabel
                                        ? ''
                                        : column.name
                                    }
                                    data-column-id={column.key}
                                    className={mergeClasses(
                                      styles.treeGridCell,
                                      column.className,
                                      column.isMultiline
                                        ? styles.multiline
                                        : styles.nowrap
                                    )}
                                    style={{
                                      minWidth: column.minWidth,
                                      maxWidth: column.maxWidth,
                                      width:
                                        column.minWidth === column.maxWidth
                                          ? column.minWidth
                                          : undefined,
                                      flex:
                                        column.minWidth === column.maxWidth
                                          ? undefined
                                          : '1 1 auto'
                                    }}
                                  >
                                    <ItemColumn
                                      item={item}
                                      column={column}
                                      index={itemIndex}
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
                      {isOpen ? (
                        <ChevronDown20Regular />
                      ) : (
                        <ChevronRight20Regular />
                      )}
                      <TreeGridCell
                        header
                        aria-colspan={columns.length}
                        className={styles.groupHeaderCell}
                        style={{
                          color: holiday
                            ? tokens.colorPaletteRedForeground1
                            : undefined,
                          ...group.data?.styles
                        }}
                      >
                        <span>{group.name}</span>
                        {total && (
                          <span className={styles.groupHeaderTotal}>
                            ({total})
                          </span>
                        )}
                      </TreeGridCell>
                    </TreeGridRow>
                  )
                })}
              </TreeGrid>
            ) : (
              renderDataGrid()
            )}
            <EmptyMessage items={items} error={props.error} />
            <ListFilterPanel />
            <ViewColumnsPanel />
          </ScrollablePaneWrapper>
        )}
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
  setKey: List.displayName,
  resizableColumns: true,
  autoFitColumns: true
}
