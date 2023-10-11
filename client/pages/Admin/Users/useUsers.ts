import { useMutation } from '@apollo/client'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import $addUsers from './addUsers.gql'
import { IUsersContext } from './context'
import { useUsersReducer } from './reducer'
import {
  CLEAR_PROGRESS,
  HIDE_ADD_MULTIPLE_PANEL,
  SET_PROGRESS
} from './reducer/actions'
import { useColumns } from './useColumns'
import { useUsersMenuItems } from './useUsersMenuItems'
import { useUsersQuery } from './useUsersQuery'

/**
 * Component logic for `Users`
 *
 * @category Users
 */
export function useUsers() {
  const { t } = useTranslation()
  const [state, dispatch] = useUsersReducer()
  const [addUsers] = useMutation($addUsers)
  const query = useUsersQuery(dispatch)
  const context = useMemo(
    () =>
      ({
        ...query,
        state,
        dispatch
      }) as IUsersContext,
    [state, query.loading]
  )

  /**
   * On add users to the current subscription.
   *
   * @param users - Users to add
   */
  const onAddUsers = async (users: any[]) => {
    dispatch(HIDE_ADD_MULTIPLE_PANEL())
    dispatch(
      SET_PROGRESS(
        t('admin.users.bulkImportingUsersLabel', {
          count: users.length
        })
      )
    )
    await addUsers({
      variables: {
        users: users.map((user) => ({
          ..._.omit(user, '__typename'),
          provider: 'azuread-openidconnect'
        }))
      }
    })
    dispatch(CLEAR_PROGRESS())
    query.refetch()
  }

  const columns = useColumns()
  const menuItems = useUsersMenuItems(context)

  return {
    context,
    columns,
    menuItems,
    onAddUsers
  }
}
