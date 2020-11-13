import { TFunction } from 'i18next'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import React from 'react'
import { ApiToken } from 'types'
import { DateObject } from 'utils/date'

/**
 * Returns the columns for the ApiTokens list
 *
 * @param {void} onEdit On edit callback
 * @param {TFunction} t Translate function
 */
export const ApiTokensColumns = (onDeleteApiToken: (token: ApiToken) => void, t: TFunction): IColumn[] => [
  {
    key: 'name',
    fieldName: 'name',
    name: t('common.nameFieldLabel'),
    minWidth: 100,
    maxWidth: 250
  },
  {
    key: 'created',
    name: t('common.createdLabel'),
    minWidth: 100,
    maxWidth: 180,
    onRender: (token: ApiToken) => new DateObject(token.created).format('MMMM D, YYYY	')
  },
  {
    key: 'expires',
    name: t('common.expiresLabel'),
    minWidth: 100,
    maxWidth: 200,
    onRender: (token: ApiToken) =>new DateObject(token.expires).format('MMMM D, YYYY')
  },
  {
    key: 'actions',
    name: '',
    minWidth: 150,
    onRender: (token: ApiToken) => {
      return (
        <DefaultButton
          text={t('common.delete')}
          iconProps={{ iconName: 'RecycleBin' }}
          onClick={() => onDeleteApiToken(token)}
        />
      )
    }
  }
]
