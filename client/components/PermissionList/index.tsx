/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import { usePermissions } from 'hooks'
import React from 'react'
import styles from './PermissionList.module.scss'
import { IPermissionListProps } from './types'

/**
 * @category Reusable Component
 */
export const PermissionList: ReusableComponent<IPermissionListProps> = ({
  permissionIds
}) => {
  const [permissions] = usePermissions(permissionIds)
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {permissions.map((perm) => (
          <div key={perm.id} className={styles.item} title={perm.description}>
            <Icon className={styles.icon} iconName={perm.iconName} />
            <span>{perm.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export * from './types'
