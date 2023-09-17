import { Icon } from '@fluentui/react'
import { Caption1, Persona } from '@fluentui/react-components'
import { DynamicButton } from 'components'
import { IListColumn } from 'components/List/types'
import { DateObject } from 'DateUtils'
import { usePermissions } from 'hooks/user/usePermissions'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { User } from 'types'
import { getFluentIcon } from 'utils'
import { createColumnDef } from 'utils/createColumnDef'
import { IUsersContext } from './context'
import { SET_USER_FORM } from './reducer/actions'
import styles from './Users.module.scss'

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
      createColumnDef<User>(
        'avatar',
        '',
        {
          minWidth: 240,
          maxWidth: 240
        },
        (user) => (
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
      createColumnDef<User>('surname', t('common.surnameLabel'), {
        maxWidth: 100,
        data: { hidden: isMobile }
      }),
      createColumnDef<User>('givenName', t('common.givenNameLabel'), {
        maxWidth: 120,
        data: { hidden: isMobile }
      }),
      createColumnDef<User>('jobTitle', t('common.jobTitleLabel'), {
        maxWidth: 140,
        data: { hidden: isMobile }
      }),
      type === 'active' &&
        createColumnDef(
          'role.name',
          t('common.roleLabel'),
          {
            maxWidth: 150,
            data: { hidden: isMobile }
          },
          ({ role }) => (
            <div className={styles.roleColumn}>
              <Icon iconName={role.icon} />
              <Caption1>{role.name}</Caption1>
            </div>
          )
        ),
      createColumnDef<User>(
        'lastActive',
        t('common.lastActiveLabel'),
        {
          maxWidth: 180,
          data: { hidden: isMobile },
          renderAs: 'timeFromNow'
        },
        (user) => (
          <div
            className={styles.lastActiveColumn}
            style={{ visibility: user.lastActive ? 'visible' : 'hidden' }}
          >
            {getFluentIcon('Timer')}
            <Caption1>{new DateObject(user.lastActive).$.fromNow()}</Caption1>
          </div>
        )
      ),
      type === 'active' &&
        createColumnDef<User>(
          'actions',
          '',
          { maxWidth: 100, hidden: !hasPermission(PermissionScope.LIST_USERS) },
          (user) => (
            <div className={styles.actionsColumn}>
              <DynamicButton
                text={t('common.editLabel')}
                onClick={() =>
                  context.dispatch(
                    SET_USER_FORM({
                      headerText: user.displayName,
                      user
                    })
                  )
                }
                iconName='PersonEdit'
                size='small'
              />
            </div>
          )
        )
    ]
      .filter(Boolean)
      .filter((col) => !col.hidden)
  }
}
