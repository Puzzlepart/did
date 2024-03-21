import { ICommandBarProps } from '@fluentui/react'
import { useMemo } from 'react'
import _ from 'underscore'
import { useListContext } from '../context'
import { ListMenuItem } from './ListMenuItem'
import { useExcelExportCommand } from './useExcelExportCommand'
import { useFiltersCommand } from './useFiltersCommand'
import { useSearchBoxCommand } from './useSearchBoxCommand'

/**
 * Custom hook that returns the necessary props for a list toolbar, including search box, filter commands, and export options.
 *
 * @returns An object containing the necessary props for a list toolbar.
 */
export function useListToolbar() {
  const context = useListContext()
  const excelExportCommands = useExcelExportCommand()
  const { commandBarItem: searchBoxItem, menuItem: searchBoxMenuItem } =
    useSearchBoxCommand()
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
        excelExportCommands?.commandBarItem
      ].filter(Boolean)
    }),
    [context.props.commandBar]
  )

  const menuItemsFromProps = _.isFunction(context.props.menuItems)
    ? context.props.menuItems(context)
    : context.props.menuItems

  const menuItems = useMemo(() => {
    return _.isEmpty(menuItemsFromProps)
      ? ListMenuItem.convert([
          ...commandBarProps.items,
          ...commandBarProps.farItems
        ])
      : [
          searchBoxMenuItem,
          ...menuItemsFromProps,
          filterCommands.toggle?.menuItem,
          excelExportCommands?.menuItem
        ].filter(Boolean)
  }, [menuItemsFromProps])

  const menuItemGroups = useMemo<{ [key: string]: ListMenuItem[] }>(
    () =>
      _.uniq(menuItems.map((m) => m.group)).reduce(
        (groups, name) => ({
          ...groups,
          [name ?? 'default']: menuItems.filter((m) => m.group === name)
        }),
        {}
      ),
    [menuItems]
  )
  return menuItemGroups
}
