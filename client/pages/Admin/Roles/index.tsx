import { List, TabComponent, Toast } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RolePanel } from './RolePanel'
import styles from './Roles.module.scss'
import { useRoles } from './useRoles'

/**
 * @ignore
 */
export const Roles: TabComponent = () => {
  const { t } = useTranslation()
  const { query, columns, panel, setPanel, toast } = useRoles()
  return (
    <div className={styles.root}>
      <Toast {...toast} />
      <List
        enableShimmer={query.loading}
        items={query?.data?.roles}
        columns={columns}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_ROLE',
              name: t('admin.addNewRole'),
              onClick: () => setPanel({ headerText: t('admin.addNewRole') }),
              iconProps: { iconName: 'Permissions' }
            }
          ],
          farItems: []
        }}
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
    </div>
  )
}
