
import { useQuery } from '@apollo/react-hooks'
import List from 'components/List'
import { value } from 'helpers'
import { IUser } from 'interfaces/IUser'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { columns } from './columns'
import { GET_DATA } from './GET_DATA'
import { IUserFormModalProps, UserForm } from './UserForm'

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['common', 'admin'])
    const [userForm, setUserForm] = useState<IUserFormModalProps>(null)
    const { data, refetch, loading, called } = useQuery(GET_DATA, { fetchPolicy: 'cache-and-network' })

    /**
     * On edit user
     * 
     * @param {IUser} user User to edit
     */
    const onEdit = (user: IUser) => setUserForm({
        title: user.displayName,
        user,
        roles: data?.roles || []
    })

    return (
        <>
            <List
                enableShimmer={loading && !called}
                items={data?.users || []}
                columns={columns(onEdit, t)}
                commandBar={{
                    items: [
                        {
                            key: 'ADD_NEW_USER',
                            name: t('addNewUser', { ns: 'admin' }),
                            iconProps: { iconName: 'AddFriend' },
                            onClick: () => setUserForm({
                                title: t('addNewUser', { ns: 'admin' }),
                                roles: value(data, 'roles', []),
                            }),
                        },
                        {
                            key: 'IMPORT_USERS',
                            name: 'Importer',
                            iconProps: { iconName: 'CloudImportExport' },
                            onClick: () => setUserForm({
                                title: t('addNewUser', { ns: 'admin' }),
                                roles: value(data, 'roles', []),
                            }),
                        },
                    ],
                    farItems: []
                }} />
            {userForm && (
                <UserForm
                    {...userForm}
                    users={data?.adUsers || []}
                    panel={{
                        onDismiss: event => {
                            setUserForm(null)
                            !event && refetch()
                        }
                    }} />)}
        </>
    )
}