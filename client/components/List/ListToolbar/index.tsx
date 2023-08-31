/* eslint-disable unicorn/no-array-callback-reference */
import { CommandBar } from '@fluentui/react'
import { Toolbar } from '@fluentui/react-components'
import React, { FC } from 'react'
import _ from 'underscore'
import { useListContext } from '../context'
import { ListToolbarItem } from './ListToolbarItem'
import { useListToolbar } from './useListToolbar'

export const ListToolbar: FC<{ root: React.MutableRefObject<any> }> = ({
  root
}) => {
  const context = useListContext()
  const { commandBarProps, menuItems } = useListToolbar(root)

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
  return (
    <Toolbar>
      {menuItems.map((item, index) => (
        <ListToolbarItem key={index} item={item} />
      ))}
    </Toolbar>
  )
}

export * from './ListMenuItem'
