import { Icon } from '@fluentui/react'
import { DeleteLink, EditLink } from 'components'
import { PermissionList } from 'components/PermissionList'
import React, { Dispatch } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { IRolePanelProps } from './RolePanel'
import styles from './RolesPermissions.module.scss'

/**
 * Columns hook for Roles
 *
 * @param setPanel - A callback function to set the panel state
 * @param onDelete - A callback function to delete a role
 */
export function useColumns(
  setPanel: Dispatch<React.SetStateAction<IRolePanelProps>>,
  onDelete: (role: Role) => void
) {
  const { t } = useTranslation()
  return [
    createColumnDef<Role>('name', '', { maxWidth: 150 }, (role) => {
      return (
        <div className={styles.nameColumn}>
          <Icon className={styles.icon} iconName={role.icon} />
          <div>{role.name}</div>
        </div>
      )
    }),
    createColumnDef('description', t('common.descriptionFieldLabel'), {
      maxWidth: 240,
      isMultiline: true,
      data: { hidden: isMobile }
    }),
    createColumnDef<Role>(
      'permissions',
      t('admin.permissonsLabel'),
      { minWidth: 400, maxWidth: 400, isMultiline: true },
      (role) => <PermissionList permissionIds={role.permissions} />
    ),
    createColumnDef<Role>(
      null,
      null,
      { minWidth: 100, maxWidth: 100 },
      (role) => (
        <div style={{ display: 'flex' }}>
          <EditLink
            style={{ marginRight: 12 }}
            hidden={role.readOnly}
            onClick={() => {
              setPanel({
                headerText: t('admin.editRole'),
                edit: role
              })
            }}
          />
          <DeleteLink hidden={role.readOnly} onClick={() => onDelete(role)} />
        </div>
      )
    )
  ]
}
