/* eslint-disable react-hooks/exhaustive-deps */
import { ICommandBarProps } from '@fluentui/react'
import React, { useMemo } from 'react'
import _ from 'underscore'
import { useListContext } from '../context'
import { ListMenuItem } from './ListMenuItem'
import { useExcelExportCommand } from './useExcelExportCommand'
import { useFiltersCommand } from './useFiltersCommand'
import { useSearchBoxCommand } from './useSearchBoxCommand'

/**
 * Custom hook that returns the necessary props for a list toolbar, including search box, filter commands, and export options.
 *
 * @param root A mutable ref object that represents the root element of the component.
 *
 * @returns An object containing the necessary props for a list toolbar.
 */
export function useListToolbar(root: React.MutableRefObject<any>) {
  const context = useListContext()
  const {
    commandBarItem: excelExportCommandBarItem,
    menuItem: excelExportMenuItem
  } = useExcelExportCommand()
  const { commandBarItem: searchBoxItem, menuItem: searchBoxMenuItem } =
    useSearchBoxCommand(root)
  const filterCommands = useFiltersCommand()

  const hasFilterableColumns = _.any(
    context.props.columns,
    (col) => col?.data?.isFilterable
  )

  const commandBarProps = useMemo<ICommandBarProps>(() => ({
    ...context.props.commandBar,
    items: [searchBoxItem, ...context.props.commandBar?.items].filter(Boolean),
    farItems: [
      ...(context.props.commandBar?.farItems ?? []),
      hasFilterableColumns && filterCommands.toggle.commandBarItem,
      hasFilterableColumns && filterCommands.clear.commandBarItem,
      context.props.exportFileName && excelExportCommandBarItem
    ].filter(Boolean)
  }), [context.props.commandBar, hasFilterableColumns])

  const menuItems = useMemo(() => _.isEmpty(context.props.menuItems)
    ? ListMenuItem.convert([
      ...commandBarProps.items,
      ...commandBarProps.farItems
    ])
    : [
      searchBoxMenuItem,
      ...context.props.menuItems,
      filterCommands.toggle.menuItem,
      filterCommands.clear.menuItem,
      excelExportMenuItem
    ].filter(Boolean)
    , [])
  return {
    commandBarProps,
    menuItems
  }
}
