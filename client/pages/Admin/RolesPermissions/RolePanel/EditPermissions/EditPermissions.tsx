import {
  Menu,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses
} from '@fluentui/react-components'
import { DynamicButton, PermissionList, UserMessage } from 'components'
import { Field, FieldDescription } from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { t9r } from 'utils'
import styles from './EditPermissions.module.scss'
import { IEditPermissionsProps } from './types'
import { useEditPermissions } from './useEditPermissions'

export const EditPermissions: StyledComponent<IEditPermissionsProps> = (
  props
) => {
  const { t } = useTranslation()
  const { permissions, checkedValues, onCheckedValueChange } =
    useEditPermissions(props)
  return (
    <Field
      name={props.name}
      label={t9r(props.labelFormat, {
        label: props.label,
        count: checkedValues.permissions?.length ?? 0
      })}
      className={mergeClasses(EditPermissions.className, props.className)}
    >
      {_.isEmpty(checkedValues.permissions) ? (
        <UserMessage
          className={styles.emptyPermissions}
          text={props.emptyMessage}
          hidden={!props.emptyMessage}
        />
      ) : (
        <PermissionList
          className={styles.permissionsList}
          permissionIds={checkedValues.permissions ?? []}
        />
      )}
        <Menu>
          <DynamicButton
            text={props.buttonLabel ?? props.label}
            iconName={props.buttonIcon}
            triggerFor='Menu'
          />
          <MenuPopover>
            <MenuList>
              {Object.keys(permissions).map((key) => (
                <Menu
                  key={key}
                  checkedValues={checkedValues}
                  onCheckedValueChange={onCheckedValueChange}
                >
                  <MenuTrigger disableButtonEnhancement>
                    <MenuItem>{t(`permissions.category_${key}`)}</MenuItem>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      {permissions[key].length > 1 && (
                        <>
                          <MenuItemCheckbox name={key} value='allSelected'>
                            {t('permissions.selectAll')}
                          </MenuItemCheckbox>

                          <div
                            style={{
                              borderBottom: '1px solid #eaeaea',
                              margin: '0 0 8px 0'
                            }}
                          />
                        </>
                      )}
                      {permissions[key].map((permission, index) => (
                        <MenuItemCheckbox
                          key={index}
                          name={props.name}
                          value={permission.id}
                          disabled={permission.disabled}
                        >
                          {permission.name}
                        </MenuItemCheckbox>
                      ))}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
        <FieldDescription text={props.description} />
    </Field>
  )
}

EditPermissions.displayName = 'EditPermissions'
EditPermissions.className = styles.editPermissions
EditPermissions.defaultProps = {
  api: false,
  selectedPermissions: [],
  name: 'permissions',
  buttonIcon: 'KeyMultiple',
  labelFormat: '{{label}} ({{count}})'
}
