import { Persona } from '@fluentui/react-components'
import { IconText } from 'components'
import { EditLink } from 'components/EditLink'
import { IListColumn } from 'components/List/types'
import $date from 'DateUtils'
import { usePermissions } from 'hooks/user/usePermissions'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { PermissionScope } from '../../../../shared/config/security/permissions'
import { IUsersContext } from './context'
import { SET_USER_FORM } from './reducer/actions'

/**
 * Returns columns for the `Users` component
 *
 * @category Users
 */
export function useColumns(
  context: IUsersContext
): (type: 'active' | 'disabled') => IListColumn[] {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  return (type) => {
    return [
      col(
        'avatar',
        '',
        {
          minWidth: 240,
          maxWidth: 240
        },
        (user: User) => (
          <Persona
            name={user.displayName}
            secondaryText={user.mail}
            avatar={{
              image: {
                src: user.photo?.base64
              }
            }}
            size='medium'
          />
        )
      ),
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
      type === 'active' &&
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
        onRender: (row) =>
          $date.formatDate(row.lastActive, 'MMM DD, YYYY HH:mm')
      }),
      type === 'active' &&
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
                  context.dispatch(
                    SET_USER_FORM({
                      headerText: user.displayName,
                      user
                    })
                  )
                }
              />
            </div>
          )
        )
    ]
      .filter(Boolean)
      .filter((col) => !col.hidden)
  }
}
