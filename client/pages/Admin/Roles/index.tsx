/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { List, TabComponent } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IRolePanelProps, RolePanel } from './RolePanel'
import $roles from './roles.gql'
import styles from './Roles.module.scss'
import { useColumns } from './useColumns'

/**
 * @category Tab Component
 */
export const Roles: TabComponent = () => {
  const { t } = useTranslation()
  const { data, loading, refetch } = useQuery($roles)
  const [panel, setPanel] = useState<IRolePanelProps>(null)
  const columns = useColumns({ setPanel })

  return (
    <div className={styles.root}>
      <List
        enableShimmer={loading}
        items={data?.roles || []}
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
