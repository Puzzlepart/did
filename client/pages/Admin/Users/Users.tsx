import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { IListProps, List } from 'components/List'
import { Tabs } from 'components/Tabs'
import { ITabProps, TabComponent } from 'components/Tabs/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { User } from 'types'
import { BulkImportPanel } from './BulkImportPanel'
import { UserForm } from './UserForm'
import styles from './Users.module.scss'
import { UsersContext } from './context'
import {
  HIDE_ADD_MULTIPLE_PANEL,
  HIDE_USER_FORM,
  SET_SELECTED_USERS
} from './reducer/actions'
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
              t('admin.users.activeHeaderText'),
              {
                items: context.state.activeUsers,
                columns: columns('active'),
                menuItems,
                checkboxVisibility: CheckboxVisibility.onHover,
                selectionProps: [
                  SelectionMode.multiple,
                  (selected) =>
                    context.dispatch(SET_SELECTED_USERS(selected as User[]))
                ]
              } as IListProps<User>
            ],
            disabled: [
              List,
              t('admin.users.disabledHeaderText'),
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
            open={!!context.state.userForm}
            onDismiss={(event) => {
              context.dispatch(HIDE_USER_FORM())
              !event && context.refetch()
            }}
          />
          <BulkImportPanel
            {...context.state.bulkImportPanel}
            open={!!context.state.bulkImportPanel}
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
