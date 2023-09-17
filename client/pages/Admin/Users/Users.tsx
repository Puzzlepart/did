import { SelectionMode } from '@fluentui/react'
import { List } from 'components/List'
import { Tabs } from 'components/Tabs'
import { ITabProps, TabComponent } from 'components/Tabs/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { AddMultiplePanel } from './AddMultiplePanel'
import { UsersContext } from './context'
import { HIDE_ADD_MULTIPLE_PANEL, HIDE_USER_FORM } from './reducer/actions'
import { UserForm } from './UserForm'
import styles from './Users.module.scss'
import { useUsers } from './useUsers'

/**
 * Manage users
 *
 * * See active users
 * * See disabled users
 * * Add new users
 * * Edit users
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
              { text: t('admin.users.activeHeaderText'), iconName: 'Person' },
              {
                items: context.state.activeUsers,
                columns: columns('active'),
                menuItems,
                selectionMode: SelectionMode.multiple
              }
            ],
            disabled: [
              List,
              {
                text: t('admin.users.disabledHeaderText'),
                iconName: 'PersonProhibited'
              },
              {
                items: context.state.disabledUsers,
                columns: columns('disabled'),
                selectionMode: SelectionMode.none
              }
            ]
          }}
        >
          <UserForm
            {...context.state.userForm}
            isOpen={!!context.state.userForm}
            onDismiss={(event) => {
              context.dispatch(HIDE_USER_FORM())
              !event && context.refetch()
            }}
          />
          <AddMultiplePanel
            {...context.state.addMultiplePanel}
            isOpen={!!context.state.addMultiplePanel}
            onAdd={onAddUsers}
            onDismiss={() => context.dispatch(HIDE_ADD_MULTIPLE_PANEL())}
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
