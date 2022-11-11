import { usePermissions } from 'hooks/user/usePermissions'
import { PermissionCheckbox } from 'pages/Admin/Roles/RolePanel/PermissionCheckbox'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import styles from './PermissionsControl.module.scss'
import { IPermissionsControlProps } from './types'

export const PermissionsControl: FC<IPermissionsControlProps> = ({
  token,
  onToggle
}) => {
  const { t } = useTranslation()
  const [permissions] = usePermissions(null, true)
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('admin.apiTokens.permissionsTitle')}
      </div>
      <div className={styles.body}>
        {permissions.map((permission, index) => (
          <PermissionCheckbox
            key={index}
            checked={_.contains(token.permissions, permission.id)}
            permission={permission}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}
