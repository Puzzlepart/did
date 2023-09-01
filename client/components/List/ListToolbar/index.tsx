/* eslint-disable unicorn/no-array-callback-reference */
import { CommandBar } from '@fluentui/react'
import { Toolbar } from '@fluentui/react-components'
import React, { FC, MutableRefObject } from 'react'
import { useListContext } from '../context'
import { ListToolbarItem } from './ListToolbarItem'
import { useListToolbar } from './useListToolbar'

export interface IListToolbarProps {
  root: MutableRefObject<any>
}

export const ListToolbar: FC<IListToolbarProps> = (props) => {
  const context = useListContext()
  const { commandBarProps, menuItems } = useListToolbar(props.root)

  if (context.props.disablePreview) {
    return (
      <CommandBar
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
