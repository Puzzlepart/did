/* eslint-disable tsdoc/syntax */
import { List, TabComponent, Toast } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RolePanel } from './RolePanel'
import styles from './Roles.module.scss'
import { useRoles } from './useRoles'

export const Roles: TabComponent = () => {
  const { t } = useTranslation()
  const { loading, roles, refetch, columns, panel, setPanel, toast } =
    useRoles()
  return (
    <div className={styles.root}>
      <Toast {...toast} />
      <List
        enableShimmer={loading}
        items={roles}
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
            await refetch()
            setPanel(null)
          }}
          onDismiss={() => setPanel(null)}
        />
      )}
    </div>
  )
}
