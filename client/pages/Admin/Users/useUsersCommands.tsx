import { ICommandBarProps, Spinner } from '@fluentui/react'
import { usePermissions } from 'hooks/user/usePermissions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { PermissionScope } from '../../../../shared/config/security/permissions'
import { IUsersContext } from './context'
import {
  CLEAR_PROGRESS,
  SET_ADD_MULTIPLE_PANEL,
  SET_PROGRESS,
  SET_USER_FORM
} from './reducer/actions'
import { useUsersSync } from './useUsersSync'

/**
 * Commands hook for `Users`
 *
 * @param context Context
 */
export function useUsersCommands(context: IUsersContext) {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const syncUsers = useUsersSync(context)
  return {
    items: [
      {
        key: 'ADD_NEW_USER',
        name: t('admin.users.addNewUser'),
        iconProps: { iconName: 'AddFriend' },
        disabled:
          context.state.loading ||
          _.isEmpty(context.state.availableAdUsers) ||
          !hasPermission(PermissionScope.LIST_USERS),
        onClick: () =>
          context.dispatch(
            SET_USER_FORM({ headerText: t('admin.users.addNewUser') })
          )
      },
      {
        key: 'BULK_IMPORT_USERS',
        name: t('admin.users.bulkImportUsersLabel'),
        iconProps: { iconName: 'CloudImportExport' },
        disabled:
          context.state.loading ||
          _.isEmpty(context.state.availableAdUsers) ||
          !hasPermission(PermissionScope.MANAGE_USERS),
        onClick: () =>
          context.dispatch(SET_ADD_MULTIPLE_PANEL({ isOpen: true }))
      },
      {
        key: 'SYNC_USERS',
        name: t('admin.users.syncUsersLabel'),
        iconProps: { iconName: 'UserSync' },
        disabled:
          context.state.loading || !hasPermission(PermissionScope.MANAGE_USERS),
        onClick: async () => {
          context.dispatch(
            SET_PROGRESS({
              label: t('admin.users.synchronizingUserProperties'),
              labelPosition: 'right'
            })
          )
          await syncUsers()
          context.dispatch(CLEAR_PROGRESS())
        }
      },
      {
        key: 'SPINNER',
        name: '',
        onRender: () =>
          context.state.progress && (
            <Spinner
              styles={{ root: { marginLeft: 15 } }}
              {...context.state.progress}
            />
          )
      }
    ],
    farItems: []
  } as ICommandBarProps
}
