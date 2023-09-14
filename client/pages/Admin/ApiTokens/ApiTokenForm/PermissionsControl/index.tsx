import { usePermissions } from 'hooks/user/usePermissions'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { PermissionCheckbox } from './PermissionCheckbox'
import styles from './PermissionsControl.module.scss'
import { IPermissionsControlProps } from './types'
import { StyledComponent } from 'types'

export const PermissionsControl: StyledComponent<IPermissionsControlProps> = (props) => {
  const { t } = useTranslation()
  const [permissions] = usePermissions(null, true)
  return (
    <div className={PermissionsControl.className}>
      <div className={styles.title}>
        {t('admin.apiTokens.permissionsTitle')}
      </div>
      <div className={styles.body}>
        {permissions.map((permission, index) => (
          <PermissionCheckbox
            key={index}
            checked={_.contains(props.token.permissions, permission.id)}
            permission={permission}
            onToggle={props.onToggle}
          />
        ))}
      </div>
    </div>
  )
}

PermissionsControl.displayName = 'PermissionsControl'
PermissionsControl.className = styles.permissionsControl