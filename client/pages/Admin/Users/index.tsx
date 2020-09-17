
import { useMutation, useQuery } from '@apollo/react-hooks'
import List from 'components/List'
import { IUser } from 'interfaces/IUser'
import { ISpinnerProps, Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { filter, find, isEmpty, omit } from 'underscore'
import BULK_ADD_USERS from './BULK_ADD_USERS'
import { columns } from './columns'
import { GET_DATA } from './GET_DATA'
import { IBulkImportPanelProps, BulkImportPanel } from './BulkImportPanel'
import { IUserFormProps, UserForm } from './UserForm'
import { IUsersContext, UsersContext } from './UsersContext'

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['common', 'admin'])
    const [userForm, setUserForm] = useState<IUserFormProps>(null)
    const [bulkImportPanel, setBulkImportPanel] = useState<IBulkImportPanelProps>(null)
    const [progressProps, setProgressProps] = useState<ISpinnerProps>(null)
    const { data, refetch, loading, called } = useQuery(GET_DATA, { fetchPolicy: 'cache-and-network' })
    const [bulkAddUsers] = useMutation(BULK_ADD_USERS)
    const ctxValue: IUsersContext = useMemo(() => ({
        roles: data?.roles || [],
        users: data?.users || [],
        adUsers: data?.adUsers || [],
    }), [data])
    ctxValue.adUsers = filter(ctxValue.adUsers, x => !find(ctxValue.users, y => y.id === x.id))


    /**
     * On edit user
     * 
     * @param {IUser} user User to edit
     */
    const onEdit = (user: IUser) => setUserForm({
        headerText: user.displayName,
        user,
    })

    /**
     * On import users
     * 
     * @param {any[]} users Users to import
     */
    const onBulkImport = async (users: any[]) => {
        setBulkImportPanel(null)
        setProgressProps({ label: format(t('bulkImportingUsersLabel'), users.length), labelPosition: 'right' })
        await bulkAddUsers({ variables: { users: users.map(u => omit(u, '__typename')) } })
        setProgressProps(null)
        refetch()
    }


    return (
        <UsersContext.Provider value={ctxValue}>
            <List
                enableShimmer={loading && !called}
                items={ctxValue.users}
                columns={columns(onEdit, t)}
                commandBar={{
                    items: [
                        {
                            key: 'ADD_NEW_USER',
                            name: t('addNewUser', { ns: 'admin' }),
                            iconProps: { iconName: 'AddFriend' },
                            disabled: isEmpty(ctxValue.adUsers),                            
                            onClick: () => setUserForm({ headerText: t('addNewUser', { ns: 'admin' }) }),
                        },
                        {
                            key: 'BULK_IMPORT_USERS',
                            name: t('bulkImportUsersLabel', { ns: 'admin' }),
                            iconProps: { iconName: 'CloudImportExport' },
                            disabled: isEmpty(ctxValue.adUsers),      
                            onClick: () => setBulkImportPanel({ isOpen: true }),
                        },
                        {
                            key: 'SPINNER',
                            name: '',
                            onRender: () => progressProps && <Spinner styles={{ root: { marginLeft: 15 } }} {...progressProps} />
                        }
                    ],
                    farItems: []
                }} />
            {userForm && (
                <UserForm
                    {...userForm}
                    onDismiss={event => {
                        setUserForm(null)
                        !event && refetch()
                    }} />)}
            {bulkImportPanel && (
                <BulkImportPanel
                    {...bulkImportPanel}
                    onImport={onBulkImport}
                    onDismiss={() => setBulkImportPanel(null)} />
            )}
        </UsersContext.Provider>
    )
}