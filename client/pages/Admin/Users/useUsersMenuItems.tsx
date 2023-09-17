import { ListMenuItem } from 'components/List/ListToolbar'
import { Progress } from 'components/Progress'
import { usePermissions } from 'hooks/user/usePermissions'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import _ from 'underscore'
import { IUsersContext } from './context'
import {
  CLEAR_PROGRESS,
  SET_ADD_MULTIPLE_PANEL,
  SET_PROGRESS,
  SET_USER_FORM
} from './reducer/actions'
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
  return useMemo(() => {
    return [
      new ListMenuItem(t('admin.users.addNewUser'))
        .withIcon('PeopleAdd')
        .setDisabled(
          context.state.loading ||
            _.isEmpty(context.state.availableAdUsers) ||
            !hasPermission(PermissionScope.IMPORT_USERS),
          'Du har ikke tilstrekkelige rettigheter til å legge til nye brukere.'
        )
        .withDispatch(context, SET_USER_FORM, {
          headerText: t('admin.users.addNewUser')
        }),
      new ListMenuItem(t('admin.users.bulkImportUsersLabel'))
        .withIcon('ArrowImport')
        .setDisabled(
          context.state.loading || !hasPermission(PermissionScope.IMPORT_USERS),
          'Du har ikke tilstrekkelige rettigheter til å importere brukere.'
        )
        .withDispatch(context, SET_ADD_MULTIPLE_PANEL, { isOpen: true }),
      new ListMenuItem(t('admin.users.syncUsersLabel'))
        .withIcon('PersonSync')
        .setDisabled(
          context.state.loading || !hasPermission(PermissionScope.IMPORT_USERS),
          'Du har ikke tilstrekkelige rettigheter til å synkronisere brukere.'
        )
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
          padding='10px 10px'
          hidden={!context.state.progress}
        />
      ))
    ]
  }, [
    context.state.loading,
    context.state.availableAdUsers,
    hasPermission,
    context.state.progress
  ])
}
