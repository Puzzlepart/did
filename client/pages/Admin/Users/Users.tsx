import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { IListProps, List } from 'components/List'
import { Tabs } from 'components/Tabs'
import { ITabProps, TabComponent } from 'components/Tabs/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { User } from 'types'
import { BulkImportPanel } from './BulkImportPanel'
import { InviteExternalUserForm } from './InviteExternalUserForm'
import { PendingInvitations } from './PendingInvitations'
import { UserForm } from './UserForm'
import styles from './Users.module.scss'
import { UsersContext } from './context'
import { useUsers } from './hooks'
import {
  HIDE_ADD_MULTIPLE_PANEL,
  HIDE_INVITE_EXTERNAL_USER_FORM,
  HIDE_USER_FORM,
  SET_SELECTED_USERS,
  SET_USER_FORM
} from './reducer/actions'

/**
 * Manage users
 *
 * * See active users
 * * See disabled users
 * * Add new users
 * * Edit users
 * * Invite external users
 * * See pending invitations
 *
 * @ignore
 */
export const Users: TabComponent<ITabProps> = () => {
  const { t } = useTranslation()
  const { context, columns, menuItems, onAddUsers } = useUsers()

  return (
    <UsersContext.Provider value={context}>
      <div className={Users.className}>
        <Tabs
          level={3}
          items={{
            active: [
              List,
              t('admin.users.activeHeaderText'),
              {
                searchBox: {
                  fullWidth: true,
                  persist: true,
                  placeholder: t('admin.users.searchUsersLabel', {
                    usersCount: context.state.activeUsers.length
                  })
                },
                items: context.state.activeUsers,
                columns: columns('active'),
                onItemInvoked: (user) => {
                  context.dispatch(
                    SET_USER_FORM({
                      headerText: user.displayName,
                      user
                    })
                  )
                },
                menuItems,
                setKey: context.state.setKey,
                checkboxVisibility: CheckboxVisibility.onHover,
                selectionProps: [
                  SelectionMode.multiple,
                  (selected) =>
                    context.dispatch(SET_SELECTED_USERS(selected as User[]))
                ],
                enableShimmer: context.state.loading,
                enableViewColumnsEdit: true,
                persistViewColumns: Users.displayName
              } as IListProps<User>
            ],
            disabled: [
              List,
              t('admin.users.disabledHeaderText'),
              {
                items: context.state.disabledUsers,
                columns: columns('disabled'),
                selectionMode: SelectionMode.none,
                enableShimmer: context.state.loading,
                enableViewColumnsEdit: true,
                persistViewColumns: Users.displayName
              } as IListProps<User>
            ],
            pendingInvitations: [
              PendingInvitations,
              t('admin.users.pendingInvitations')
            ]
          }}
        >
          <UserForm
            {...context.state.userForm}
            open={!!context.state.userForm}
            onDismiss={({ refetch = false } = {}) => {
              context.dispatch(HIDE_USER_FORM())
              refetch && context.refetch()
            }}
          />
          <BulkImportPanel
            {...context.state.bulkImportPanel}
            open={!!context.state.bulkImportPanel}
            onAdd={onAddUsers}
            onDismiss={() => context.dispatch(HIDE_ADD_MULTIPLE_PANEL())}
          />
          <InviteExternalUserForm
            {...context.state.inviteExternaluserForm}
            onDismiss={() => context.dispatch(HIDE_INVITE_EXTERNAL_USER_FORM())}
          />
        </Tabs>
      </div>
    </UsersContext.Provider>
  )
}

Users.displayName = 'Users'
Users.className = styles.users
Users.defaultProps = {
  permission: PermissionScope.LIST_USERS
}
