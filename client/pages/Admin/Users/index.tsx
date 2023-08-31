import { PivotItem } from '@fluentui/react'
import { List, TabComponent, TabContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AddMultiplePanel } from './AddMultiplePanel'
import { UsersContext } from './context'
import { HIDE_ADD_MULTIPLE_PANEL, HIDE_USER_FORM } from './reducer/actions'
import { UserForm } from './UserForm'
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
export const Users: TabComponent = () => {
  const { t } = useTranslation()
  const { context, columns, onAddUsers, commandBar } = useUsers()

  return (
    <UsersContext.Provider value={context}>
      <TabContainer level={3}>
        <PivotItem
          itemKey='active'
          headerText={t('admin.users.activeHeaderText')}
        >
          <List
            enableShimmer={context.state.loading}
            items={context.state.activeUsers}
            columns={columns('active')}
            commandBar={commandBar}
          />
        </PivotItem>
        <PivotItem
          itemKey='disabled'
          headerText={t('admin.users.disabledHeaderText')}
        >
          <List
            enableShimmer={context.state.loading}
            items={context.state.disabledUsers}
            columns={columns('disabled')}
          />
        </PivotItem>
      </TabContainer>
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
    </UsersContext.Provider>
  )
}
