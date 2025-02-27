import { formatCurrency } from 'utils'
import { ListField } from '../../types'
import { TFunction } from 'i18next'

export function renderValue(
  value: string | number | boolean,
  renderAs: ListField['renderAs'],
  defaultValue: string,
  t: TFunction
) {
  if (!value) return defaultValue
  switch (renderAs) {
    case 'currency': {
      return formatCurrency(value as number)
    }
    case 'boolean': {
      return value ? t('common.yes') : t('common.no')
    }
    default: {
      return value
    }
  }
}
