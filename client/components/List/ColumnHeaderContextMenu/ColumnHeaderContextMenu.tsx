import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { useColumnHeaderContextMenu } from './useColumnHeaderContextMenu'

export const ColumnHeaderContextMenu: FC = () => {
  const menu = useColumnHeaderContextMenu()
  if (!menu) return null
  const { items, target, checkedValues, hasCheckmarks, onDismiss } = menu
  return (
    <Menu
      open={true}
      positioning={{ target }}
      checkedValues={checkedValues}
      hasCheckmarks={hasCheckmarks}
      onOpenChange={(_, data) => {
        if (!data.open) onDismiss()
      }}
    >
      <MenuPopover>
        <MenuList>
          {items.map((item) => {
            if (item.type === 'divider') {
              return <MenuDivider key={item.key} />
            }
            if (item.checkable) {
              return (
                <MenuItemCheckbox
                  key={item.key}
                  name='columnHeader'
                  value={item.key}
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.()
                    onDismiss()
                  }}
                >
                  {item.text}
                </MenuItemCheckbox>
              )
            }
            return (
              <MenuItem
                key={item.key}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.()
                  onDismiss()
                }}
              >
                {item.text}
              </MenuItem>
            )
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
