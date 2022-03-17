/* eslint-disable tsdoc/syntax */
import { Spinner } from '@fluentui/react'
import { List, TabComponent } from 'components'
import { usePermissions } from 'hooks/user/usePermissions'
import React from 'react'
import _ from 'underscore'
import { PermissionScope } from '../../../../shared/config/security/permissions'
import { AddMultiplePanel } from './AddMultiplePanel'
import { UsersContext } from './context'
import { UserForm } from './UserForm'
import { useUsers } from './useUsers'

/**
 * Manage users
 *
 * * See active users
 * * Add new users
 * * Edit users
 */
export const Users: TabComponent = () => {
  const {
    context,
    columns,
    query,
    progress,
    userForm,
    setUserForm,
    addMultiplePanel,
    setAddMultiplePanel,
    onAddUsers,
    t
  } = useUsers()
  const [, hasPermission] = usePermissions()

  return (
    <UsersContext.Provider value={context}>
      <List
        enableShimmer={query.loading && _.isEmpty(context.activeDirectoryUsers)}
        items={context.users}
        columns={columns}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_USER',
              name: t('admin.addNewUser'),
              iconProps: { iconName: 'AddFriend' },
              disabled:
                _.isEmpty(context.activeDirectoryUsers) ||
                !hasPermission(PermissionScope.LIST_USERS),
              onClick: () => setUserForm({ headerText: t('admin.addNewUser') })
            },
            {
              key: 'BULK_IMPORT_USERS',
              name: t('admin.bulkImportUsersLabel'),
              iconProps: { iconName: 'CloudImportExport' },
              disabled:
                _.isEmpty(context.activeDirectoryUsers) ||
                !hasPermission(PermissionScope.LIST_USERS),
              onClick: () => setAddMultiplePanel({ isOpen: true })
            },
            {
              key: 'SPINNER',
              name: '',
              onRender: () =>
                progress && (
                  <Spinner
                    styles={{ root: { marginLeft: 15 } }}
                    {...progress}
                  />
                )
            }
          ],
          farItems: []
        }}
      />
      <UserForm
        {...userForm}
        isOpen={!!userForm}
        onDismiss={(event) => {
          setUserForm(null)
          !event && query.refetch()
        }}
      />
      <AddMultiplePanel
        {...addMultiplePanel}
        isOpen={!!addMultiplePanel}
        onAdd={onAddUsers}
        onDismiss={() => setAddMultiplePanel(null)}
      />
    </UsersContext.Provider>
  )
}
