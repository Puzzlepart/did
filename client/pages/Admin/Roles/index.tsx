import { useQuery } from '@apollo/client'
import { List } from 'components'
import { PermissionList } from 'components/PermissionList'
import { Role } from 'types'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { GET_ROLES } from './GET_ROLES'
import { IRolePanelProps, RolePanel } from './RolePanel'


export const Roles = () => {
    const { t } = useTranslation()    
    const { data, loading, refetch } = useQuery(GET_ROLES)
    const [panel, setPanel] = useState<IRolePanelProps>(null)
    const columns = [
        col(
            'name',
            '',
            { maxWidth: 140 },
            (role: Role) => {
                return (
                    <div>
                        <Icon styles={{ root: { fontSize: 33 } }} iconName={role.icon} />
                        <div>{role.name}</div>
                    </div>
                )
            }
        ),
        col(
            'permissions',
            t('admin.permissonsLabel'),
            { minWidth: 200, isMultiline: true },
            (role: Role) => <PermissionList permissionIds={role.permissions} />
        ),
        col(
            'edit',
            '',
            { minWidth: 300, },
            (role: Role) => (
                <>
                    <DefaultButton
                        styles={{ root: { marginRight: 4 } }}
                        text={t('admin.editRole')}
                        onClick={() => setPanel({
                            title: t('admin.editRole'),
                            model: role,
                        })} />
                </>
            )),
    ]

    return (
        <>
            <List
                enableShimmer={loading}
                items={data?.roles || []}
                columns={columns}
                commandBar={{
                    items: [
                        {
                            key: 'addNewRole',
                            name: t('admin.addNewRole'),
                            iconProps: { iconName: 'AddFriend' },
                            onClick: () => setPanel({
                                title: t('admin.addNewRole'),
                            }),
                        },
                    ],
                    farItems: []
                }} />
            {panel && (
                <RolePanel
                    {...panel}
                    onSave={() => {
                        refetch().then(() => setPanel(null))
                    }}
                    onDismiss={() => setPanel(null)} />
            )}
        </>
    )
}