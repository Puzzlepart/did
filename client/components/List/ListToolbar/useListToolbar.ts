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
  const excelExportCommands = useExcelExportCommand()
  const { commandBarItem: searchBoxItem, menuItem: searchBoxMenuItem } =
    useSearchBoxCommand(root)
  const filterCommands = useFiltersCommand()

  const commandBarProps = useMemo<ICommandBarProps>(
    () => ({
      ...context.props.commandBar,
      items: [searchBoxItem, ...context.props.commandBar?.items].filter(
        Boolean
      ),
      farItems: [
        ...(context.props.commandBar?.farItems ?? []),
        filterCommands.toggle?.commandBarItem,
        filterCommands.clear?.commandBarItem,
        excelExportCommands?.commandBarItem
      ].filter(Boolean)
    }),
    [context.props.commandBar]
  )

  const menuItems = useMemo(
    () =>
      _.isEmpty(context.props.menuItems)
        ? ListMenuItem.convert([
            ...commandBarProps.items,
            ...commandBarProps.farItems
          ])
        : [
            searchBoxMenuItem,
            ...context.props.menuItems,
            filterCommands.toggle?.menuItem,
            filterCommands.clear?.menuItem,
            excelExportCommands?.menuItem
          ].filter(Boolean),
    [context.props.menuItems]
  )
  return {
    commandBarProps,
    menuItems
  }
}
