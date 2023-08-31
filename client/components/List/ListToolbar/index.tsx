/* eslint-disable unicorn/no-array-callback-reference */
import {
  CommandBar,
  ICommandBarProps
} from '@fluentui/react'
import { Toolbar } from '@fluentui/react-components'
import React, { FC } from 'react'
import _ from 'underscore'
import { useListContext } from '../context'
import { ListMenuItem } from './ListMenuItem'
import { ListToolbarItem } from './ListToolbarItem'
import { useExcelExportCommand } from './useExcelExportCommand'
import { useFiltersCommand } from './useFiltersCommand'
import { useSearchBoxCommand } from './useSearchBoxCommand'

export const ListToolbar: FC<{ root: React.MutableRefObject<any> }> = ({
  root
}) => {
  const context = useListContext()
  const { commandBarItem: excelExportCommandBarItem, menuItem: excelExportMenuItem } = useExcelExportCommand()
  const { commandBarItem: searchBoxItem } = useSearchBoxCommand(root)
  const filterCommands = useFiltersCommand()

  const hasFilterableColumns = _.any(
    context.props.columns,
    (col) => col?.data?.isFilterable
  )

  const commandBarProps: ICommandBarProps = {
    ...context.props.commandBar,
    items: [searchBoxItem, ...context.props.commandBar?.items].filter(Boolean),
    farItems: [
      ...(context.props.commandBar?.farItems ?? []),
      hasFilterableColumns && filterCommands.toggle.commandBarItem,
      hasFilterableColumns && filterCommands.clear.commandBarItem,
      context.props.exportFileName && excelExportCommandBarItem
    ].filter(Boolean)
  }

  if (context.props.disablePreview) {
    return (
      <CommandBar
        hidden={
          _.isEmpty(commandBarProps.items) &&
          _.isEmpty(commandBarProps.farItems)
        }
        {...commandBarProps}
        styles={{ root: { margin: 0, padding: 0 } }}
      />
    )
  }
  const items = _.isEmpty(context.props.menuItems)
    ? ListMenuItem.convert([...commandBarProps.items, ...commandBarProps.farItems])
    : [
      ...context.props.menuItems,
      filterCommands.toggle.menuItem,
      filterCommands.clear.menuItem,
      excelExportMenuItem
    ]
  return (
    <Toolbar>
      {items.map((item, index) => <ListToolbarItem key={index} item={item} />)}
    </Toolbar>
  )
}

export * from './ListMenuItem'
