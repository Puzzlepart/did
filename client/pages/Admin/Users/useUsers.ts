import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import $addUsers from './addUsers.gql'
import { IUsersContext } from './context'
import { useUsersReducer } from './reducer'
import {
  CLEAR_PROGRESS,
  DATA_UPDATED,
  HIDE_ADD_MULTIPLE_PANEL,
  SET_PROGRESS
} from './reducer/actions'
import { useColumns } from './useColumns'
import $users from './users.gql'
import { useUsersMenuItems } from './useUsersMenuItems'

/**
 * Component logic for `Users`
 *
 * @category Users
 */
export function useUsers() {
  const { t } = useTranslation()
  const [state, dispatch] = useUsersReducer()
  const query = useQuery($users, {
    fetchPolicy: 'cache-and-network'
  })
  const [addUsers] = useMutation($addUsers)
  const context = useMemo(
    () =>
      ({
        ...query,
        state,
        dispatch
      } as IUsersContext),
    [state, query.loading]
  )

  useEffect(() => dispatch(DATA_UPDATED({ query })), [query])

  /**
   * On add users
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
    refetch: query.refetch,
    columns,
    menuItems,
    onAddUsers
  }
}
