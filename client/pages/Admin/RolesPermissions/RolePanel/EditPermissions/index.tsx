import { Icon } from '@fluentui/react'
import {
  Button,
  FluentProvider,
  Menu,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  webLightTheme
} from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './EditPermissions.module.scss'
import { IEditPermissionsProps } from './types'
import { useEditPermissions } from './useEditPermissions'

export const EditPermissions: StyledComponent<IEditPermissionsProps> = (
  props
) => {
  const { permissions, checkedValues, onCheckedValueChange } =
    useEditPermissions(props)
  return (
    <FluentProvider theme={webLightTheme} className={EditPermissions.className}>
      <div>
        <Menu
          checkedValues={checkedValues}
          onCheckedValueChange={onCheckedValueChange}
        >
          <MenuTrigger disableButtonEnhancement>
            <Button appearance='subtle'>{props.label}</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {permissions.map((permission, index) => (
                <MenuItemCheckbox
                  key={index}
                  name='permissions'
                  value={permission.id}
                  icon={<Icon iconName={permission.iconName} />}
                >
                  {permission.name}
                </MenuItemCheckbox>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </FluentProvider>
  )
}

EditPermissions.displayName = 'EditPermissions'
EditPermissions.className = styles.editPermissions
