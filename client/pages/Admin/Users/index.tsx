
import { useMutation, useQuery } from '@apollo/react-hooks'
import List from 'components/List'
import { value } from 'helpers'
import { IUser } from 'interfaces/IUser'
import { ISpinnerProps, Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { without, omit, pick } from 'underscore'
import BULK_ADD_USERS from './BULK_ADD_USERS'
import { columns } from './columns'
import { GET_DATA } from './GET_DATA'
import { IImportPanelProps, ImportPanel } from './ImportPanel'
import { IUserFormProps, UserForm } from './UserForm'

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['common', 'admin'])
    const [userForm, setUserForm] = useState<IUserFormProps>(null)
    const [importPanel, setImportPanel] = useState<IImportPanelProps>(null)
    const [progressProps, setProgressProps] = useState<ISpinnerProps>(null)
    const { data, refetch, loading, called } = useQuery(GET_DATA, { fetchPolicy: 'cache-and-network' })
    const [bulkAddUsers] = useMutation(BULK_ADD_USERS)

    const [roles, users, adUsers] = useMemo(() => [data?.roles || [], data?.users || [], data?.adUsers || []], [data])

    /**
     * On edit user
     * 
     * @param {IUser} user User to edit
     */
    const onEdit = (user: IUser) => setUserForm({
        headerText: user.displayName,
        user,
        roles
    })

    /**
     * On import users
     * 
     * @param {any[]} users Users to import
     */
    const onImport = async (users: any[]) => {
        setImportPanel(null)
        setProgressProps({ label: format(t('importingUsersText'), users.length), labelPosition: 'right' })
        await bulkAddUsers({ variables: { users: users.map(u => omit(u, '__typename')) } })
        setProgressProps(null)
        refetch()
    }

    return (
        <>
            <List
                enableShimmer={loading && !called}
                items={users || []}
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
                            onClick: () => setImportPanel({
                                users: data?.adUsers,
                                headerText: 'Importer brukere'
                            }),
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
                    users={adUsers}
                    onDismiss={event => {
                        setUserForm(null)
                        !event && refetch()
                    }} />)}
            {importPanel && (
                <ImportPanel
                    {...importPanel}
                    onImport={onImport}
                    onDismiss={() => setImportPanel(null)} />
            )}
        </>
    )
}