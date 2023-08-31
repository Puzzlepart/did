import { Button, Label, Menu, MenuItemCheckbox, MenuList, MenuTrigger } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditPermissions.module.scss'
import { IEditPermissionsProps } from './types'
import { useEditPermissions } from './useEditPermissions'

export const EditPermissions: FC<IEditPermissionsProps> = (props) => {
  const { t } = useTranslation()
  const { open, onOpenChange, permissions, checkedValues } = useEditPermissions(props)
  return (
    <div className={styles.root}>
      <div>
        <Label weight='semibold'>{t('admin.permissonsLabel')}</Label>
      </div>
      <div>
        <Menu
        open={open}
        onOpenChange={onOpenChange}
          checkedValues={checkedValues}
          onCheckedValueChange={(event,data) => {
            // eslint-disable-next-line no-console
            console.log(event.currentTarget, data)
          }}>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance='subtle'>Endre tilganger</Button>
          </MenuTrigger>
          <MenuList>
            <MenuItemCheckbox
              name='permissions'
              value={'-1'}>
              test
            </MenuItemCheckbox>
            {permissions.map((permission, index) => (
              <MenuItemCheckbox
                key={index}
                name='permissions'
                value={permission.id}>
                {permission.name}
              </MenuItemCheckbox>
            ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
