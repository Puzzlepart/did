/* eslint-disable react-hooks/rules-of-hooks */
import {
  Menu,
  MenuItem,
  MenuItemCheckbox,
  MenuItemCheckboxProps,
  MenuItemProps,
  MenuList,
  MenuPopover,
  MenuProps
} from '@fluentui/react-components'
import React, { FC, useState } from 'react'
import { ListMenuItem } from './ListMenuItem'
import { ListToolbarButton } from './ListToolbarButton'

/**
 * Renders a menu item based on the provided `IListMenuItem`.
 * If the `IListMenuItem` has a `value` property, it will render a `MenuItemCheckbox`.
 * If the `IListMenuItem` has an `items` property, it will recursively call `renderMenu`.
 * Otherwise, it will render a regular `MenuItem`.
 *
 * @param item - The `IListMenuItem` to render.
 * @param closeMenu - A function that closes the menu.
 *
 * @returns The rendered `MenuItem`, `MenuItemCheckbox`, or `Menu` (if `item` has `items`).
 */
export const ListToolbarMenuItem: FC<{
  item: ListMenuItem
  closeMenu?: () => void
}> = (props) => {
  const { item, closeMenu } = props
  switch (item.componentType) {
    case 'menu_item_checkbox': {
      const props = item.createProps<MenuItemCheckboxProps>()
      return (
        <MenuItemCheckbox
          {...props}
          onClick={() => {
            props.onClick(null)
            closeMenu && closeMenu()
          }}
        />
      )
    }
    case 'menu': {
      return <ListToolbarMenu {...props} />
    }
    default: {
      const props = item.createProps<MenuItemProps>()
      return (
        <MenuItem
          {...props}
          content={item.text}
          onClick={() => {
            props.onClick(null)
            closeMenu && closeMenu()
          }}
        />
      )
    }
  }
}

/**
 * Renders a menu for a list item.
 *
 * @param item - The list item to render the menu for.
 *
 * @returns The rendered menu.
 */
export const ListToolbarMenu: FC<{ item: ListMenuItem }> = ({ item }) => {
  const props = item.createProps<MenuProps>()
  const [open, setOpen] = useState(false)
  const onOpenChange: MenuProps['onOpenChange'] = (_, data) =>
    setOpen(data.open)
  return (
    <Menu open={open} onOpenChange={onOpenChange} {...props}>
      <ListToolbarButton item={item} menuTrigger />
      <MenuPopover>
        <MenuList>
          {item.items.map((menuItem, index) => (
            <ListToolbarMenuItem
              key={index}
              item={menuItem}
              closeMenu={() => setOpen(false)}
            />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
