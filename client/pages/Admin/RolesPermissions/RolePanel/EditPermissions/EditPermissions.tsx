import { css, Icon } from '@fluentui/react'
import {
  FluentProvider,
  Menu,
  MenuItemCheckbox,
  MenuList,
  MenuPopover
} from '@fluentui/react-components'
import { DynamicButton } from 'components'
import { FieldDescription } from 'components/FormControl'
import React from 'react'
import { fluentLightTheme } from 'theme'
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
    <div className={css(EditPermissions.className, props.className)}>
      <FluentProvider theme={fluentLightTheme}>
        <div>
          <Menu
            checkedValues={checkedValues}
            onCheckedValueChange={onCheckedValueChange}
          >
            <DynamicButton
              text={props.label}
              iconName='Accessibility'
              triggerFor='Menu'
            />
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
          <FieldDescription text={props.description} />
        </div>
      </FluentProvider>
    </div>
  )
}

EditPermissions.displayName = 'EditPermissions'
EditPermissions.className = styles.editPermissions
EditPermissions.defaultProps = {
  api: false
}
