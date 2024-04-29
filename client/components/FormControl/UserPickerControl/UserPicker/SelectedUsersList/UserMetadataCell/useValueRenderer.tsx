import { formatCurrency } from 'utils'
import { IUserMetadataCellProps } from './types'
import { useUserPickerContext } from '../../context'

export function useValueRenderer() {
  const context = useUserPickerContext()

  function renderValue(
    value: string | number,
    props: IUserMetadataCellProps,
    defaultValue: string
  ) {
    if (!value) return defaultValue
    if (context.props.list?.onRenderValue) {
      return context.props.list.onRenderValue(value, props)
    }
    switch (props.field.renderAs) {
      case 'currency': {
        return formatCurrency(value as number)
      }
      default: {
        return value
      }
    }
  }
  return renderValue
}
