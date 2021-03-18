/* eslint-disable tsdoc/syntax */
import { IColumn, Icon, Persona, PersonaSize } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { EditLink } from '../../../components/EditLink'

/**
 * Columns hook
 *
 * @category Users
 */
export function useColumns({ setUserForm }): IColumn[] {
  const { t } = useTranslation()
  return [
    col('displayName', null, { maxWidth: 250 }, ({ displayName, mail }) => (
      <Persona
        size={PersonaSize.size40}
        text={displayName}
        secondaryText={mail}
      />
    )),
    col('role.name', t('common.roleLabel'), { maxWidth: 150 }, ({ role }) => (
      <div title={role.description}>
        <Icon style={{ marginRight: 8 }} iconName={role.icon} />
        <span>{role.name}</span>
      </div>
    )),
    col('surname', t('common.surnameLabel'), { maxWidth: 160 }),
    col('givenName', t('common.givenNameLabel'), { maxWidth: 160 }),
    col('jobTitle', t('common.jobTitleLabel'), { maxWidth: 140 }),
    col('mail', t('common.mailLabel'), { maxWidth: 180 }),
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
