import { Icon } from '@fluentui/react'
import { DeleteLink, EditLink } from 'components'
import { PermissionList } from 'components/PermissionList'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import styles from './Roles.module.scss'

/**
 * Columns hook for Roles
 */
export function useColumns({ setPanel, onDelete }) {
  const { t } = useTranslation()
  return [
    col('name', '', { maxWidth: 150 }, (role: Role) => {
      return (
        <div className={styles.nameColumn}>
          <Icon className={styles.icon} iconName={role.icon} />
          <div>{role.name}</div>
        </div>
      )
    }),
    col('description', t('common.descriptionFieldLabel'), {
      maxWidth: 240,
      isMultiline: true,
      data: { hidden: isMobile }
    }),
    col(
      'permissions',
      t('admin.permissonsLabel'),
      { minWidth: 400, maxWidth: 400, isMultiline: true },
      (role: Role) => <PermissionList permissionIds={role.permissions} />
    ),
    col(null, null, { minWidth: 100, maxWidth: 100 }, (role: Role) => (
      <div style={{ display: 'flex' }}>
        <EditLink
          style={{ marginRight: 12 }}
          hidden={role.readOnly}
          onClick={() => {
            setPanel({
              headerText: t('admin.editRole'),
              model: role
            })
          }}
        />
        <DeleteLink hidden={role.readOnly} onClick={() => onDelete(role)} />
      </div>
    ))
  ]
}
