import * as securityConfig from 'config/security'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { contains } from 'underscore'
import styles from './PermissionList.module.scss'
import { IPermissionListProps } from './types'

export const PermissionList = ({ permissionIds }: IPermissionListProps) => {
  const { t } = useTranslation()
  const permissions = useMemo(() => {
    return securityConfig.permissions(t).filter((perm) => contains(permissionIds, perm.id))
  }, [permissionIds, t])
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {permissions.map((perm) => (
          <div key={perm.id} className={styles.item} title={perm.description}>
            {perm.name}
          </div>
        ))}
      </div>
    </div>
  )
}
