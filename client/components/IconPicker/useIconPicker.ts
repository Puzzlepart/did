/* eslint-disable tsdoc/syntax */
import { ISuggestionItem } from 'components/Autocomplete'
import { useFabricIcons } from 'hooks'
import { omit } from 'underscore'
import { IIconPickerProps } from './types'

/**
 * @category Reusable Component
 */
export function useIconPicker(props: IIconPickerProps) {
  const items = useFabricIcons()

  const getDefaultSelectedKey = () => {
    const { defaultSelected, model, name } = props
    if (defaultSelected) return defaultSelected
    if (model && name) return model.value(name) as string
  }

  const onClear = () => {
    const { onSelected, model, name } = props
    if (onSelected) {
      onSelected(null)
    }
    if (model && name) {
      model.set(name, null)
    }
  }

  const onSelected = (item: ISuggestionItem) => {
    const { onSelected, model, name } = props
    if (onSelected) onSelected(item.data)
    if (model && name) model.set(name, item.data)
  }

  return omit({
    ...props,
    items,
    defaultSelectedKey: getDefaultSelectedKey(),
    onSelected,
    onClear,
    itemIcons: true
  }, 'className')
}
