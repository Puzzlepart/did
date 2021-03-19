import { DeleteLink } from 'components'
import { IListColumn } from 'components/List/types'
import { DateObject } from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'

/**
 * Returns the columns for the ApiTokens list
 */
export function useColumns({ onDeleteApiToken }): IListColumn[] {
  const { t } = useTranslation()
  return [
    {
      key: 'name',
      fieldName: 'name',
      name: t('common.nameFieldLabel'),
      minWidth: 100,
      maxWidth: 100
    },
    {
      key: 'created',
      name: t('common.createdLabel'),
      minWidth: 100,
      maxWidth: 180,
      onRender: (token: ApiToken) =>
        new DateObject(token.created).format('MMMM D, YYYY	')
    },
    {
      key: 'expires',
      name: t('common.expiresLabel'),
      minWidth: 100,
      onRender: (token: ApiToken) =>
        new DateObject(token.expires).format('MMMM D, YYYY')
    },
    {
      key: 'actions',
      name: '',
      minWidth: 150,
      onRender: (token: ApiToken) => (
        <DeleteLink onClick={() => onDeleteApiToken(token)} />
      )
    }
  ]
}
