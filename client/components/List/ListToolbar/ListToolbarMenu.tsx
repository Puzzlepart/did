/* eslint-disable react-hooks/rules-of-hooks */
import {
  Menu,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger
} from '@fluentui/react-components'
import React, { FC, useState } from 'react'
import { createStyle } from './createStyle'
import { ListToolbarButton } from './ListToolbarButton'
import { ListMenuItem } from './ListMenuItem'

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
export const ListToolbarMenuItem: FC<{ item: ListMenuItem, closeMenu?: () => void }> = (props) => {
  const {item, closeMenu} = props
  if (item.value) {
    return (
      <MenuItemCheckbox
        name={item.name}
        value={item.value}
        content={item.text}
        icon={ListMenuItem.createIcon(item)}
        style={createStyle(item)}
        disabled={item.disabled}
        onClick={() => {
          item.onClick(null)
          closeMenu && closeMenu()
        }}
      />
    )
  }
  if (item.items) return <ListToolbarMenu {...props} />
  return (
    <MenuItem
      content={item.text}
      icon={ListMenuItem.createIcon(item)}
      style={createStyle(item)}
      disabled={item.disabled}
      onClick={() => {
        item.onClick(null)
        closeMenu && closeMenu()
      }}
    />
  )
}

/**
 * Renders a menu for a list item.
 *
 * @param item - The list item to render the menu for.
 *
 * @returns The rendered menu.
 */
export const ListToolbarMenu: FC<{ item: ListMenuItem }> = ({ item }) => {
  const { items, checkedValues } = item
  const hasCheckmarks = items.some(({ value }) => !!value)
  const hasIcons = items.some(({ icon }) => !!icon)
  const [open, setOpen] = useState(false)
  const onOpenChange: MenuProps['onOpenChange'] = (_, data) => {
    setOpen(data.open)
  }
  return (
    <Menu
      open={open}
      onOpenChange={onOpenChange}
      hasCheckmarks={hasCheckmarks}
      hasIcons={hasIcons}
      checkedValues={checkedValues}
    >
      <MenuTrigger disableButtonEnhancement>
        <ListToolbarButton item={item} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {items.map((menuItem, index) => <ListToolbarMenuItem key={index} item={menuItem} closeMenu={() => setOpen(false)} />)}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
