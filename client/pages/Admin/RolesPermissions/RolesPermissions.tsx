import { SelectionMode } from '@fluentui/react'
import { List } from 'components'
import { ITabProps } from 'components/Tabs/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { RolePanel } from './RolePanel'
import styles from './RolesPermissions.module.scss'
import { useRolesPermissions } from './useRolesPermissions'

export const RolesPermissions: StyledComponent<ITabProps> = () => {
  const { t } = useTranslation()
  const {
    query,
    columns,
    panel,
    setPanel,
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
        onItemInvoked={(item) => setPanel({
          panel: {
            title: t('admin.editRole'),
            onDismiss: () => setPanel(null)
          },
          edit: item
        })}
        menuItems={menuItems}
      />
      {panel && <RolePanel refetch={query.refetch} {...panel} />}
      {confirmationDialog}
    </div>
  )
}

RolesPermissions.displayName = 'RolesPermissions'
RolesPermissions.className = styles.rolesPermissions
