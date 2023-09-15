import { ISuggestionItem } from 'components/FormControl/AutocompleteControl'
import { useFabricIcons } from 'hooks'
import _ from 'underscore'
import { IIconPickerControlProps } from './types'

/**
 * @category Reusable Component
 */
export function useIconPickerControl(props: IIconPickerControlProps) {
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

  return _.omit(
    {
      ...props,
      items,
      defaultSelectedKey: getDefaultSelectedKey(),
      onSelected,
      onClear,
      itemIcons: true
    },
    'className'
  )
}
