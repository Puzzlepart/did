import { useQuery } from '@apollo/react-hooks'
import { List } from 'components'
import { value } from 'helpers'
import { IRole } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { IRolePanelProps, RolePanel } from './RolePanel'
import { GET_ROLES } from './GET_ROLES'
import { PermissionList } from 'components/PermissionList'

/**
 * @category Admin
 */
export const Roles = () => {
    const { t } = useTranslation(['admin', 'common'])
    const { data, loading, refetch } = useQuery(GET_ROLES)
    const [panel, setPanel] = React.useState<IRolePanelProps>(null)
    const columns = [
        col(
            'name',
            t('roleLabel', { ns: 'common' }),
            { maxWidth: 140 },
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
                            edit: role,
                        })} />
                </>
            )),
    ]

    return (
        <>
            <List
                enableShimmer={loading}
                items={value(data, 'roles', [])}
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