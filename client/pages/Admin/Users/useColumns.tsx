/* eslint-disable tsdoc/syntax */
import { PersonaSize } from '@fluentui/react'
import { IconText } from 'components'
import { EditLink } from 'components/EditLink'
import { IListColumn } from 'components/List/types'
import { useUserListColumn } from 'components/UserColumn'
import $date from 'DateUtils'
import { usePermissions } from 'hooks/user/usePermissions'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { PermissionScope } from '../../../../shared/config/security/permissions'
import { IUsersContext } from './context'

/**
 * Returns columns for the `Users` component
 *
 * @category Users
 */
export function useColumns({ setUserForm }: IUsersContext): IListColumn[] {
  const { t } = useTranslation()
  const userColumn = useUserListColumn(
    { size: PersonaSize.size40 },
    { maxWidth: 250 }
  )
  const [, hasPermission] = usePermissions()
  return [
    userColumn,
    col('surname', t('common.surnameLabel'), {
      maxWidth: 100,
      data: { hidden: isMobile }
    }),
    col('givenName', t('common.givenNameLabel'), {
      maxWidth: 120,
      data: { hidden: isMobile }
    }),
    col('jobTitle', t('common.jobTitleLabel'), {
      maxWidth: 140,
      data: { hidden: isMobile }
    }),
    col('mail', t('common.mailLabel'), {
      maxWidth: 180,
      data: { hidden: isMobile }
    }),
    col(
      'role.name',
      t('common.roleLabel'),
      {
        maxWidth: 150,
        data: { hidden: isMobile }
      },
      ({ role }) => <IconText iconName={role.icon} text={role.name} />
    ),
    col('lastActive', t('common.lastActiveLabel'), {
      maxWidth: 180,
      data: { hidden: isMobile },
      onRender: (row) => $date.formatDate(row.lastActive, 'MMM DD, YYYY HH:mm')
    }),
    col(
      'actions',
      '',
      { maxWidth: 100, hidden: !hasPermission(PermissionScope.LIST_USERS) },
      (user: User) => (
        <div style={{ display: 'flex' }}>
          <EditLink
            style={{ marginRight: 12 }}
            hidden={user.provider === 'google'}
            onClick={() =>
              setUserForm({
                headerText: user.displayName,
                user
              })
            }
          />
        </div>
      )
    )
  ].filter((col) => !col.hidden)
}
