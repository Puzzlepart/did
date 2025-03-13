import { SelectionMode } from '@fluentui/react'
import { List } from 'components'
import { ITabProps } from 'components/Tabs/types'
import React from 'react'
import { StyledComponent } from 'types'
import { RolePanel } from './RolePanel'
import styles from './RolesPermissions.module.scss'
import { useRolesPermissions } from './useRolesPermissions'

export const RolesPermissions: StyledComponent<ITabProps> = () => {
  const {
    query,
    columns,
    panel,
    onEdit,
    confirmationDialog,
    onSelectionChanged,
    menuItems
  } = useRolesPermissions()
  return (
    <div className={RolesPermissions.className}>
      <List
        enableShimmer={query.loading && !query.previousData}
        items={query?.data?.roles}
        columns={columns}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        onItemInvoked={(item) => onEdit(null, item)}
        menuItems={menuItems}
      />
      {panel && <RolePanel {...panel} />}
      {confirmationDialog}
    </div>
  )
}

RolesPermissions.displayName = 'RolesPermissions'
RolesPermissions.className = styles.rolesPermissions
