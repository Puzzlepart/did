import { ListMenuItem } from 'components/List/ListToolbar'
import { Progress } from 'components/Progress'
import { usePermissions } from 'hooks/user/usePermissions'
import _ from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { IUsersContext } from '../context'
import {
  CLEAR_PROGRESS,
  RESET_SELECTION,
  SET_ADD_MULTIPLE_PANEL,
  SET_INVITE_EXTERNAL_USER_FORM,
  SET_PROGRESS,
  SET_USER_FORM
} from '../reducer/actions'
import { useRevokeExternalAccess } from '../UserForm'
import { useUsersSync } from './useUsersSync'

/**
 * Returns an array of menu items for the Users tab in the Admin section.
 *
 * @param context - The context object containing the state and dispatch functions for the Users page.
 *
 * @returns An array of ListMenuItem objects representing the menu items for the Users page.
 */
export function useUsersMenuItems(context: IUsersContext) {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const syncUsers = useUsersSync(context)
  const revokeExternalAccess = useRevokeExternalAccess<ListMenuItem>(
    _.first(context.state.selectedUsers),
    () => {
      context.refetch()
      context.dispatch(RESET_SELECTION())
    },
    true
  )
  return useMemo(() => {
    return [
      new ListMenuItem(t('admin.users.addNewUser'))
        .withIcon('PeopleAdd')
        .setDisabled(context.state.loading)
        .setHidden(!hasPermission(PermissionScope.IMPORT_USERS))
        .withDispatch(context, SET_USER_FORM, {
          headerText: t('admin.users.addNewUser')
        }),
      new ListMenuItem(t('admin.users.inviteExternalUser'))
        .withIcon('GlobePerson')
        .setDisabled(context.state.loading)
        .setHidden(!hasPermission(PermissionScope.INVITE_EXTERNAL_USERS))
        .withDispatch(context, SET_INVITE_EXTERNAL_USER_FORM, { open: true }),
      new ListMenuItem(t('admin.users.bulkImportUsersLabel'))
        .withIcon('ArrowImport')
        .setDisabled(context.state.loading)
        .setHidden(!hasPermission(PermissionScope.IMPORT_USERS))
        .withDispatch(context, SET_ADD_MULTIPLE_PANEL, { isOpen: true }),
      new ListMenuItem(t('admin.users.syncUsersLabel'))
        .withIcon('ArrowSync')
        .setDisabled(
          context.state.loading ||
            context.state.selectedUsers.filter(({ isExternal }) => !isExternal)
              .length === 0
        )
        .setHidden(!hasPermission(PermissionScope.IMPORT_USERS))
        .setOnClick(async () => {
          context.dispatch(
            SET_PROGRESS(t('admin.users.synchronizingUserProperties'))
          )
          await syncUsers()
          context.dispatch(CLEAR_PROGRESS())
        }),
      new ListMenuItem().setCustomRender(() => (
        <Progress
          text={context.state.progress}
          width={400}
          padding={10}
          hidden={!context.state.progress}
        />
      )),
      revokeExternalAccess,
      new ListMenuItem(t('common.editLabel'))
        .setDisabled(
          context.state.loading || context.state.selectedUsers.length !== 1
        )
        .withIcon('Edit')
        .setOnClick(() => {
          const [user] = context.state.selectedUsers
          context.dispatch(
            SET_USER_FORM({
              headerText: user.displayName,
              user
            })
          )
        })
        .setGroup('actions')
    ]
  }, [
    context.state.loading,
    context.state.availableAdUsers,
    context.state.progress,
    context.state.selectedUsers
  ])
}
