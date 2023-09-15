import { List, Toast } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { ITabProps } from 'components/Tabs/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { RolePanel } from './RolePanel'
import styles from './RolesPermissions.module.scss'
import { useRoles } from './useRoles'

export const RolesPermissions: StyledComponent<ITabProps> = () => {
  const { t } = useTranslation()
  const { query, columns, panel, setPanel, toast, confirmationDialog } =
    useRoles()
  return (
    <div className={RolesPermissions.className}>
      <Toast {...toast} />
      <List
        enableShimmer={query.loading}
        items={query?.data?.roles}
        columns={columns}
        menuItems={[
          new ListMenuItem(t('admin.addNewRole'))
            .setOnClick(() => setPanel({ headerText: t('admin.addNewRole') }))
            .withIcon('Permissions')
        ]}
      />
      {panel && (
        <RolePanel
          {...panel}
          onSave={async () => {
            await query.refetch()
            setPanel(null)
          }}
          onDismiss={() => setPanel(null)}
        />
      )}
      {confirmationDialog}
    </div>
  )
}

RolesPermissions.displayName = 'RolesPermissions'
RolesPermissions.className = styles.rolesPermissions
