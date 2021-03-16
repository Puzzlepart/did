/* eslint-disable tsdoc/syntax */
import { DefaultButton, IColumn, Icon } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Role, User } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Columns hook
 * 
 * @category Users
 */
export function useColumns({ setUserForm }): IColumn[] {
  const { t } = useTranslation()
  return [
    col(
      'role.name',
      t('common.roleLabel'),
      { maxWidth: 150 },
      ({ role }: User) => (
        <div title={(role as Role).description}>
          <Icon style={{ marginRight: 8 }} iconName={(role as Role).icon} />
          <span>{(role as Role).name}</span>
        </div>
      )
    ),
    col('displayName', t('common.displayNameLabel'), { maxWidth: 180 }),
    col('surname', t('common.surnameLabel'), { maxWidth: 160 }),
    col('givenName', t('common.givenNameLabel'), { maxWidth: 160 }),
    col('jobTitle', t('common.jobTitleLabel'), { maxWidth: 140 }),
    col('mail', t('common.mailLabel'), { maxWidth: 180 }),
    col('actions', '', {}, (user: User) => (
      <DefaultButton text={t('common.editLabel')} onClick={() => setUserForm({
        headerText: user.displayName,
        user
      })} />
    ))
  ]
}
