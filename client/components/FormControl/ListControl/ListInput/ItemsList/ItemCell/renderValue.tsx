import { formatCurrency } from 'utils'

export function renderValue(
  value: string | number,
  renderAs: 'currency',
  defaultValue: string
) {
  if (!value) return defaultValue
  switch (renderAs) {
    case 'currency': {
      return formatCurrency(value as number)
    }
    default: {
      return value
    }
  }
}
