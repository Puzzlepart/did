import {
  Caption1,
  mergeClasses,
  Text,
  Tooltip
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import { usePermissions } from 'hooks'
import React from 'react'
import { getFluentIconWithFallback } from 'utils'
import styles from './PermissionList.module.scss'
import { IPermissionListProps } from './types'
 
export const PermissionList: ReusableComponent<IPermissionListProps> = ({
  className,
  permissionIds
}) => {
  const [permissions] = usePermissions(permissionIds)
  return (
    <div className={mergeClasses(PermissionList.className, className)}>
      <div className={styles.container}>
        {permissions.map((perm) => (
          <Tooltip
            key={perm.id}
            content={
              <div style={{ padding: '8px 15px 15px 15px' }}>
                <Text block weight='semibold' style={{ margin: '8px 0' }}>
                  {perm.name}
                </Text>
                <Caption1>{perm.description}</Caption1>
              </div>
            }
            relationship='description'
          >
            <div className={styles.item}>
              {getFluentIconWithFallback(perm.iconName, { default: 'Document' })}
              <Caption1>{perm.name}</Caption1>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

PermissionList.displayName = 'PermissionList'
PermissionList.className = styles.permissionList
