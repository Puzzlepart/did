import { IconText } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { IListColumn } from 'components/List/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Returns column definitions
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  return [
    col(
      'key',
      '',
      {
        minWidth: 125,
        maxWidth: 125
      },
      ({ key, icon, inactive }: Customer) => {
        if (inactive) {
          return (
            <IconText
              title={t('customers.inactiveText')}
              iconName='Warning'
              styles={{ root: { color: '#ffbf00' } }}
              text={key}
            />
          )
        }
        return <IconText iconName={icon} text={key} />
      }
    ),
    col(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 300 },
      (customer: Customer) => <CustomerLink customer={customer} />
    )
  ]
}
