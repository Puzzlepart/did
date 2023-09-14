import { Toolbar, ToolbarGroup } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './ListToolbar.module.scss'
import { ListToolbarItem } from './ListToolbarItem'
import { IListToolbarProps } from './types'
import { useListToolbar } from './useListToolbar'

export const ListToolbar: StyledComponent<IListToolbarProps> = (props) => {
  const menuItemGroups = useListToolbar(props.root)
  return (
    <Toolbar className={ListToolbar.className}>
      {Object.keys(menuItemGroups).map((key, index) => (
        <ToolbarGroup key={index} role='presentation'>
          {menuItemGroups[key].map((item, index) => (
            <ListToolbarItem key={index} item={item} />
          ))}
        </ToolbarGroup>
      ))}
    </Toolbar>
  )
}

ListToolbar.displayName = 'ListToolbar'
ListToolbar.className = styles.listToolbar

export * from './ListMenuItem'
export * from './types'
