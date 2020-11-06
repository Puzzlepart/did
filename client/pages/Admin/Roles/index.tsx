import { useQuery } from '@apollo/client'
import { List } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { RoleColumns as columns } from './columns'
import { GET_ROLES } from './GET_ROLES'
import { IRolePanelProps, RolePanel } from './RolePanel'
import styles from './Roles.module.scss'

export const Roles = () => {
    const { t } = useTranslation()
    const { data, loading, refetch } = useQuery(GET_ROLES)
    const [panel, setPanel] = useState<IRolePanelProps>(null)

    /**
     * On edit role
     * 
     * @param {Role} role Role to edit
     */
    const onEdit = (role: Role) => setPanel({
        title: t('admin.editRole'),
        model: role,
    })

    return (
        <div className={styles.root}>
            <List
                enableShimmer={loading}
                items={data?.roles || []}
                columns={columns(onEdit, t)}
                commandBar={{
                    items: [
                        {
                            key: 'ADD_NEW_ROLE',
                            name: t('admin.addNewRole'),
                            iconProps: { iconName: 'AddFriend' },
                            onClick: () => setPanel({ title: t('admin.addNewRole') }),
                        },
                    ],
                    farItems: []
                }} />
            {panel && (
                <RolePanel
                    {...panel}
                    onSave={() => refetch().then(() => setPanel(null))}
                    onDismiss={() => setPanel(null)} />
            )}
        </div>
    )
}