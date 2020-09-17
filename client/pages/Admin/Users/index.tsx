
import { useQuery } from '@apollo/react-hooks'
import List from 'components/List'
import { value } from 'helpers'
import { IUser } from 'interfaces/IUser'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { columns } from './columns'
import { GET_DATA } from './GET_DATA'
import { IUserFormProps, UserForm } from './UserForm'
import { ImportPanel, IImportPanelProps } from './ImportPanel'

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['common', 'admin'])
    const [userForm, setUserForm] = useState<IUserFormProps>(null)
    const [importPanel, setImportPanel] = useState<IImportPanelProps>(null)
    const { data, refetch, loading, called } = useQuery(GET_DATA, { fetchPolicy: 'cache-and-network' })

    /**
     * On edit user
     * 
     * @param {IUser} user User to edit
     */
    const onEdit = (user: IUser) => setUserForm({
        headerText: user.displayName,
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
                                headerText: t('addNewUser', { ns: 'admin' }),
                                roles: value(data, 'roles', []),
                            }),
                        },
                        {
                            key: 'IMPORT_USERS',
                            name: 'Importer',
                            iconProps: { iconName: 'CloudImportExport' },
                            onClick: () => setImportPanel({ headerText: 'Importer brukere' }),
                        },
                    ],
                    farItems: []
                }} />
            {userForm && (
                <UserForm
                    {...userForm}
                    users={data?.adUsers || []}
                    onDismiss={event => {
                        setUserForm(null)
                        !event && refetch()
                    }} />)}
            {importPanel && (
                <ImportPanel
                    {...importPanel}
                    users={data?.adUsers}
                    onDismiss={() => setImportPanel(null)} />
            )}
        </>
    )
}