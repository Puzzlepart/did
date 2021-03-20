/* eslint-disable tsdoc/syntax */
import { EditLink } from 'components/EditLink'
import { IListColumn } from 'components/List/types'
import { useUserListColumn } from 'components/UserColumn'
import { Icon, PersonaSize } from 'office-ui-fabric-react'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Returns columns for the `Users` component
 *
 * @category Users
 */
export function useColumns({ setUserForm }): IListColumn[] {
  const { t } = useTranslation()
  const userColumn = useUserListColumn(
    { size: PersonaSize.size40 },
    { maxWidth: 250 }
  )
  return [
    userColumn,
    col('surname', t('common.surnameLabel'), {
      maxWidth: 160,
      data: { hidden: isMobile }
    }),
    col('givenName', t('common.givenNameLabel'), {
      maxWidth: 160,
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
      ({ role }) => (
        <div title={role.description}>
          <Icon style={{ marginRight: 8 }} iconName={role.icon} />
          <span>{role.name}</span>
        </div>
      )
    ),
    col('actions', '', { maxWidth: 100 }, (user: User) => (
      <div style={{ display: 'flex' }}>
        <EditLink
          style={{ marginRight: 12 }}
          hidden={user.provider === 'google'}
          onClick={() => {
            setUserForm({
              headerText: user.displayName,
              user
            })
          }}
        />
      </div>
    ))
  ]
}
