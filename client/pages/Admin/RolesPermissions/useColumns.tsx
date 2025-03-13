import { Icon } from '@fluentui/react'
import { Caption1 } from '@fluentui/react-components'
import { PermissionList } from 'components/PermissionList'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import styles from './RolesPermissions.module.scss'

/**
 * Columns hook for `<RolesPermissions />` component.
 */
export function useColumns() {
  const { t } = useTranslation()
  return [
    createColumnDef<Role>('name', '', { maxWidth: 150 }, (role) => {
      return (
        <div className={styles.nameColumn}>
          <Icon iconName={role.icon} />
          <Caption1>{role.name}</Caption1>
        </div>
      )
    }),
    createColumnDef<Role>('description', t('common.descriptionFieldLabel'), {
      maxWidth: 240,
      isMultiline: true,
      data: { hidden: isMobile }
    }),
    createColumnDef<Role>(
      'permissions',
      t('admin.permissonsLabel'),
      { minWidth: 400, maxWidth: 400, isMultiline: true },
      (role) => <PermissionList permissionIds={role.permissions} />
    )
  ]
}
