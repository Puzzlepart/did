/* eslint-disable unicorn/no-array-callback-reference */
import { Toolbar } from '@fluentui/react-components'
import React, { FC, MutableRefObject } from 'react'
import { ListToolbarItem } from './ListToolbarItem'
import { useListToolbar } from './useListToolbar'

export interface IListToolbarProps {
  root: MutableRefObject<any>
}

export const ListToolbar: FC<IListToolbarProps> = (props) => {
  const { menuItems } = useListToolbar(props.root)
  return (
    <Toolbar>
      {menuItems.map((item, index) => (
        <ListToolbarItem key={index} item={item} />
      ))}
    </Toolbar>
  )
}

export * from './ListMenuItem'
