import { useMutation, useQuery } from '@apollo/client'
import List from 'components/List'
import { ISpinnerProps, Spinner } from 'office-ui-fabric'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { any, filter, isEmpty, omit } from 'underscore'
import $addUsers from './addUsers.gql'
import { AddMultiplePanel, IAddMultiplePanel } from './AddMultiplePanel'
import { UserColumns as columns } from './columns'
import { IUsersContext, UsersContext } from './context'
import { IUserFormProps, UserForm } from './UserForm'
import $users from './users.gql'

export const Users = () => {
  const { t } = useTranslation()
  const [userForm, setUserForm] = useState<IUserFormProps>(null)
  const [addMultiplePanel, setAddMultiplePanel] = useState<IAddMultiplePanel>(
    null
  )
  const [progressProps, setProgressProps] = useState<ISpinnerProps>(null)
  const { data, refetch, loading } = useQuery($users, {
    fetchPolicy: 'cache-and-network'
  })
  const [addUsers] = useMutation($addUsers)
  const ctxValue: IUsersContext = useMemo(
    () => ({
      roles: data?.roles || [],
      users: data?.users || [],
      activeDirectoryUsers: data?.activeDirectoryUsers || []
    }),
    [data]
  )
  ctxValue.activeDirectoryUsers = filter(
    ctxValue.activeDirectoryUsers,
    (x) => !any(ctxValue.users, (y) => y.id === x.id)
  )

  /**
   * On edit user
   *
   * @param {User} user User to edit
   */
  const onEdit = (user: User) =>
    setUserForm({
      headerText: user.displayName,
      user
    })

  /**
   * On add users
   *
   * @param {any[]} users Users to add
   */
  const onAddUsers = async (users: any[]) => {
    setAddMultiplePanel(null)
    setProgressProps({
      label: t('admin.bulkImportingUsersLabel', { count: users.length }),
      labelPosition: 'right'
    })
    await addUsers({
      variables: { users: users.map((u) => omit(u, '__typename')) }
    })
    setProgressProps(null)
    refetch()
  }

  return (
    <UsersContext.Provider value={ctxValue}>
      <List
        enableShimmer={loading}
        items={ctxValue.users}
        columns={columns(onEdit, t)}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_USER',
              name: t('admin.addNewUser'),
              iconProps: { iconName: 'AddFriend' },
              disabled: isEmpty(ctxValue.activeDirectoryUsers),
              onClick: () => setUserForm({ headerText: t('admin.addNewUser') })
            },
            {
              key: 'BULK_IMPORT_USERS',
              name: t('admin.bulkImportUsersLabel'),
              iconProps: { iconName: 'CloudImportExport' },
              disabled: isEmpty(ctxValue.activeDirectoryUsers),
              onClick: () => setAddMultiplePanel({ isOpen: true })
            },
            {
              key: 'SPINNER',
              name: '',
              onRender: () =>
                progressProps && (
                  <Spinner
                    styles={{ root: { marginLeft: 15 } }}
                    {...progressProps}
                  />
                )
            }
          ],
          farItems: []
        }}
      />
      {userForm && (
        <UserForm
          {...userForm}
          onDismiss={(event) => {
            setUserForm(null)
            !event && refetch()
          }}
        />
      )}
      {addMultiplePanel && (
        <AddMultiplePanel
          {...addMultiplePanel}
          onAdd={onAddUsers}
          onDismiss={() => setAddMultiplePanel(null)}
        />
      )}
    </UsersContext.Provider>
  )
}
