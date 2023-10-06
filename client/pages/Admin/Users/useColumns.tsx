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
import styles from './Users.module.scss'

/**
 * Returns columns for the `Users` list. The returned function accepts a `type` parameter,
 * which can be either `'active'` or `'disabled'`.
 *
 * @category Users
 */
export function useColumns(): (type: 'active' | 'disabled') => IListColumn[] {
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
        createColumnDef<User, TagProps>('role.name', t('common.roleLabel'), {
          maxWidth: 150,
          data: { hidden: isMobile },
          renderAs: 'tag',
          createRenderProps: (user) => ({
            icon: getFluentIconWithFallback((user.role as Role)?.icon),
            size: 'small'
          })
        }),
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
