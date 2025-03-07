import { Caption1, PersonaProps } from '@fluentui/react-components'
import { TagProps } from '@fluentui/react-tags-preview'
import { IListColumn } from 'components/List/types'
import { DateObject } from 'DateUtils'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Role, User } from 'types'
import { getFluentIcon, getFluentIconWithFallback } from 'utils'
import { createColumnDef } from 'utils/createColumnDef'
import { IUsersContext } from '../context'
import styles from '../Users.module.scss'

/**
 * Returns columns for the `Users` list. The returned function accepts a `type` parameter,
 * which can be either `'active'` or `'disabled'`.
 *
 * @param context - The `Users` context.
 *
 * @category Users
 */
export function useColumns(
  context: IUsersContext
): (type: 'active' | 'disabled') => IListColumn[] {
  const { t } = useTranslation()
  return (type) => {
    return [
      createColumnDef<User, PersonaProps>('displayName', '', {
        minWidth: 240,
        maxWidth: 240,
        renderAs: 'persona',
        createRenderProps: (user) => ({
          name: user.displayName,
          secondaryText: user.mail,
          avatar: {
            image: {
              src: user.photo?.base64
            }
          }
        })
      }),
      createColumnDef<User>('surname', t('common.surnameLabel'), {
        maxWidth: 100,
        data: { hidden: isMobile, isSortable: true }
      }),
      createColumnDef<User>('givenName', t('common.givenNameLabel'), {
        maxWidth: 120,
        data: { hidden: isMobile, isSortable: true }
      }),
      createColumnDef<User>(
        'employmentStartDate',
        t('admin.users.employmentStartDateLabel'),
        {
          minWidth: 100,
          maxWidth: 100,
          renderAs: 'timeFromNow',
          data: { hidden: true, isSortable: false }
        }
      ),
      createColumnDef<User>(
        'employmentEndDate',
        t('admin.users.employmentEndDateLabel'),
        {
          minWidth: 100,
          maxWidth: 100,
          renderAs: 'timeFromNow',
          data: { hidden: true, isSortable: false }
        }
      ),
      createColumnDef<User>('jobTitle', t('common.jobTitleLabel'), {
        maxWidth: 140,
        data: { hidden: isMobile, isSortable: true }
      }),
      createColumnDef<User>(
        'preferredLanguage',
        t('common.preferredLanguageLabel'),
        {
          minWidth: 150,
          maxWidth: 150,
          data: { hidden: true, isSortable: true }
        },
        (user) =>
          user.preferredLanguage &&
          t(`common.preferredLanguage_${user.preferredLanguage}`)
      ),
      createColumnDef<User, TagProps>('role.name', t('common.roleLabel'), {
        maxWidth: 150,
        data: {
          hidden: isMobile || type !== 'active',
          isSortable: true,
          isGroupable: true
        },
        renderAs: 'tag',
        createRenderProps: (user) => ({
          icon: getFluentIconWithFallback((user.role as Role)?.icon),
          size: 'small'
        })
      }),
      createColumnDef<User, PersonaProps>(
        'manager.displayName',
        t('common.managerLabel'),
        {
          minWidth: 240,
          maxWidth: 240,
          renderAs: 'persona',
          createRenderProps: ({ manager }) => {
            const user = context.state.activeUsers.find(
              (u) => u.id === manager.id
            )
            if (!user) return null
            return {
              name: user.displayName,
              secondaryText: user.mail,
              avatar: {
                image: {
                  src: user.photo?.base64
                }
              }
            }
          },
          data: {
            hidden: isMobile,
            isSortable: true,
            isGroupable: true,
            groupOptions: { emptyGroupName: t('common.noManagerLabel') }
          }
        }
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
      )
    ]
      .filter(Boolean)
      .filter((col) => !col.hidden)
  }
}
