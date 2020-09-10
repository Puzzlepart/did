
import { useQuery } from '@apollo/react-hooks'
import List from 'components/List'
import { value as value } from 'helpers'
import { IUser } from 'interfaces/IUser'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { GET_DATA } from './GET_DATA'
import { IUserFormModalProps, UserFormModal } from './UserFormModal'

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['common', 'admin'])
    const [userForm, setUserForm] = React.useState<IUserFormModalProps>(null)
    const { data, refetch, loading, called } = useQuery(GET_DATA, { fetchPolicy: 'cache-and-network' })
    const columns = [
        col('fullName', t('nameFieldLabel'), { maxWidth: 180 }),
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

    return (
        <>
            <List
                enableShimmer={loading && !called}
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