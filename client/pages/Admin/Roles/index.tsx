import { useQuery } from '@apollo/react-hooks'
import { List } from 'components'
import { PermissionList } from 'components/PermissionList'
import { IRole } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { GET_ROLES } from './GET_ROLES'
import { IRolePanelProps, RolePanel } from './RolePanel'

/**
 * @category Admin
 */
export const Roles = () => {
    const { t } = useTranslation(['admin', 'common'])
    const { data, loading, refetch } = useQuery(GET_ROLES)
    const [panel, setPanel] = useState<IRolePanelProps>(null)
    const columns = [
        col(
            'name',
            '',
            { maxWidth: 140 },
            (role: IRole) => {
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
            t('permissonsLabel'),
            { minWidth: 200, isMultiline: true },
            (role: IRole) => <PermissionList permissionIds={role.permissions} />
        ),
        col(
            'edit',
            '',
            { minWidth: 300, },
            (role: IRole) => (
                <>
                    <DefaultButton
                        styles={{ root: { marginRight: 4 } }}
                        text={t('editRole')}
                        onClick={() => setPanel({
                            title: t('editRole'),
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
                            name: t('addNewRole'),
                            iconProps: { iconName: 'AddFriend' },
                            onClick: () => setPanel({
                                title: t('addNewRole'),
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