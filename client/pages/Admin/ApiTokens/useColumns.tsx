import { IListColumn } from 'components/List/types'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from 'security'
import { createColumnDef } from 'utils'
import { ApiToken } from '../../../../server/graphql'
import { ApiKeyDisplay } from './ApiKeyDisplay'

/**
 * Returns the columns for the ApiTokens list
 *
 * @param onKeyCopied Callback for when the key is copied
 */
export function useColumns(
  onKeyCopied: (token: ApiToken) => void
): IListColumn[] {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  return [
    createColumnDef('name', t('common.nameFieldLabel'), {
      minWidth: 100,
      maxWidth: 100
    }),
    createColumnDef('description', t('common.descriptionFieldLabel'), {
      minWidth: 180,
      maxWidth: 220,
      isMultiline: true
    }),
    createColumnDef('created', t('common.createdLabel'), {
      minWidth: 100,
      maxWidth: 180,
      renderAs: 'timeFromNow'
    }),
    createColumnDef('expires', t('common.expiresLabel'), {
      minWidth: 100,
      maxWidth: 180,
      renderAs: 'timeFromNow'
    }),

    hasPermission($.MANAGE_API_TOKENS) &&
      createColumnDef<ApiToken>(
        'secret',
        t('admin.apiTokens.keyLabel'),
        {
          minWidth: 100,
          maxWidth: 180
        },
        (token) => (
          <ApiKeyDisplay
            toggleDisplay
            apiKey={token['secret']}
            onKeyCopied={() => onKeyCopied(token)}
          />
        )
      )
  ].filter(Boolean)
}
