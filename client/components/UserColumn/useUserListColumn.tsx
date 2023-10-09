import { PersonaProps } from '@fluentui/react-components'
import { IListColumn } from 'components/List/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserColumn } from '.'

/**
 * Returns list column definition for `<UserColumn >`
 *
 * The user object needs to be the item itself, or be
 * on the item with key `user`. Alternatively `isTotalRow`
 * set to `true` to render a total column.
 */
export function useUserListColumn(
  size?: PersonaProps['size'],
  props?: Partial<IListColumn>
): IListColumn {
  const { t } = useTranslation()
  return {
    minWidth: 50,
    maxWidth: 220,
    ...props,
    key: 'user',
    fieldName: 'user',
    name: null,
    onRender: (item) => {
      if (item.isTotalRow) {
        return (
          <span>
            <strong>{t('common.sumLabel')}</strong>
          </span>
        )
      }
      return <UserColumn user={item?.user || item} size={size} />
    }
  }
}
