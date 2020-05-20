
import { useQuery } from '@apollo/react-hooks'
import List from 'components/List'
import { value as value } from 'helpers'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { GET_DATA } from './GET_DATA'
import { IUserFormModalProps, UserFormModal } from './UserFormModal'
import { IUser } from 'interfaces/IUser'

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['common', 'admin'])
    const [userForm, setUserForm] = React.useState<IUserFormModalProps>(null)
    const { data, loading, refetch } = useQuery(GET_DATA, { fetchPolicy: 'cache-and-network' })
    const columns = [
        col('fullName', t('nameLabel'), { maxWidth: 180 }),
        col(
            'role',
            t('roleLabel'),
            {},
            (user: IUser) => user.role.name,
        ),
        col('edit', '', {}, (user: any) => (
            <DefaultButton
                text={t('editUser', { ns: 'admin' })}
                onClick={() => setUserForm({
                    title: user.fullName,
                    user,
                    roles: value(data, 'roles', [])
                })} />
        ))
    ]
    if (loading) return <ProgressIndicator />

    return (
        <>
            <List
                items={value(data, 'users', [])}
                columns={columns}
                commandBar={{
                    items: [
                        {
                            key: 'addNewUser',
                            name: t('addNewUser', { ns: 'admin' }),
                            iconProps: { iconName: 'AddFriend' },
                            onClick: () => setUserForm({
                                title: t('addNewUser', { ns: 'admin' }),
                                roles: value(data, 'roles', []),
                            }),
                        },
                    ],
                    farItems: []
                }} />
            {userForm && (
                <UserFormModal
                    {...userForm}
                    modal={{
                        onDismiss: event => {
                            setUserForm(null)
                            !event && refetch()
                        }
                    }} />)}
        </>
    )
}