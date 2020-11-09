import { TFunction } from 'i18next'
import { DefaultButton, IColumn } from 'office-ui-fabric'
import React from 'react'
import { User } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Returns the columns for the User list
 *
 * @param {void} onEdit On edit callback
 * @param {TFunction} t Translate function
 */
export const UserColumns = (onEdit: (user: User) => void, t: TFunction): IColumn[] => [
  col('role.name', t('common.roleLabel'), { maxWidth: 100 }, ({ role }: User) => role.name),
  col('displayName', t('common.displayNameLabel'), { maxWidth: 180 }),
  col('surname', t('common.surnameLabel'), { maxWidth: 160 }),
  col('givenName', t('common.givenNameLabel'), { maxWidth: 160 }),
  col('jobTitle', t('common.jobTitleLabel'), { maxWidth: 140 }),
  col('mail', t('common.mailLabel'), { maxWidth: 180 }),
  col('actions', '', {}, (user: User) => <DefaultButton text={t('common.editLabel')} onClick={() => onEdit(user)} />)
]
