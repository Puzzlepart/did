import { SelectionMode } from '@fluentui/react'
import { List, ListMenuItem } from 'components'
import { ITabProps } from 'components/Tabs/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { RolePanel } from './RolePanel'
import styles from './RolesPermissions.module.scss'
import { useRoles } from './useRoles'

export const RolesPermissions: StyledComponent<ITabProps> = () => {
  const { t } = useTranslation()
  const {
    query,
    columns,
    panel,
    setPanel,
    confirmationDialog,
    onSelectionChanged,
    selectedRole,
    onDelete
  } = useRoles()
  return (
    <div className={RolesPermissions.className}>
      <List
        enableShimmer={query.loading && !query.previousData}
        items={query?.data?.roles}
        columns={columns}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        menuItems={[
          new ListMenuItem(t('admin.addNewRole'))
            .setOnClick(() =>
              setPanel({
                panel: {
                  title: t('admin.addNewRole'),
                  onDismiss: () => setPanel(null)
                }
              })
            )
            .withIcon('Permissions'),
          new ListMenuItem(t('admin.editRole'))
            .setOnClick(() =>
              setPanel({
                panel: {
                  title: t('admin.editRole'),
                  onDismiss: () => setPanel(null)
                },
                edit: selectedRole
              })
            )
            .withIcon('Edit')
            .setGroup('actions')
            .setDisabled(!selectedRole),
          new ListMenuItem(t('admin.deleteRole'))
            .setOnClick(onDelete)
            .withIcon('Delete')
            .setGroup('actions')
            .setDisabled(!selectedRole)
        ]}
      />
      {panel && <RolePanel refetch={query.refetch} {...panel} />}
      {confirmationDialog}
    </div>
  )
}

RolesPermissions.displayName = 'RolesPermissions'
RolesPermissions.className = styles.rolesPermissions
