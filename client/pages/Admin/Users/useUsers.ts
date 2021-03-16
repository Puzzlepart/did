/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { ISpinnerProps } from 'office-ui-fabric-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { any, filter, omit } from 'underscore'
import { IAddMultiplePanel } from './AddMultiplePanel'
import $addUsers from './addUsers.gql'
import { IUsersContext } from './context'
import { useColumns } from './useColumns'
import { IUserFormProps } from './UserForm'
import $users from './users.gql'

/**
 * Users hook
 * 
 * @category Users
 */
export function useUsers() {
  const { t } = useTranslation()
  const [userForm, setUserForm] = useState<IUserFormProps>(null)
  const [addMultiplePanel, setAddMultiplePanel] = useState<IAddMultiplePanel>(
    null
  )
  const [progress, setProgress] = useState<ISpinnerProps>(null)
  const query = useQuery($users, {
    fetchPolicy: 'cache-and-network'
  })
  const [addUsers] = useMutation($addUsers)
  const context: IUsersContext = useMemo(
    () => ({
      roles: query.data?.roles || [],
      users: query.data?.users || [],
      activeDirectoryUsers: query.data?.activeDirectoryUsers || []
    }),
    [query.data]
  )
  context.activeDirectoryUsers = filter(
    context.activeDirectoryUsers,
    (x) => !any(context.users, (y) => y.id === x.id)
  )

  /**
   * On add users
   *
   * @param users - Users to add
   */
  const onAddUsers = async (users: any[]) => {
    setAddMultiplePanel(null)
    setProgress({
      label: t('admin.bulkImportingUsersLabel', { count: users.length }),
      labelPosition: 'right'
    })
    await addUsers({
      variables: { users: users.map((u) => omit(u, '__typename')) }
    })
    setProgress(null)
    query.refetch()
  }

  const columns = useColumns({ setUserForm })

  return {
    context,
    query,
    columns,
    onAddUsers,
    progress,
    setProgress,
    userForm,
    setUserForm,
    addMultiplePanel,
    setAddMultiplePanel,
    t
  }
}
