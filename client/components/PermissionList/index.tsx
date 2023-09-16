import { Icon } from '@fluentui/react'
import { Caption1, Text, Tooltip } from '@fluentui/react-components'
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
    <div className={PermissionList.className}>
      <div className={styles.container}>
        {permissions.map((perm) => (
          <Tooltip
            key={perm.id}
            content={
              <div style={{ padding: 15 }}>
                <Text block weight='semibold' style={{ margin: '8px 0' }}>
                  {perm.name}
                </Text>
                <Caption1>{perm.description}</Caption1>
              </div>
            }
            relationship='description'
          >
            <div className={styles.item} title={perm.description}>
              <Icon className={styles.icon} iconName={perm.iconName} />
              <span>{perm.name}</span>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

PermissionList.displayName = 'PermissionList'
PermissionList.className = styles.permissionList

export * from './types'
