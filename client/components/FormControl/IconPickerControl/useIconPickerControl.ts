import { IIconProps } from '@fluentui/react'
import {
  IAutocompleteControlProps,
  ISuggestionItem
} from 'components/FormControl/AutocompleteControl'
import { useFabricIcons } from 'hooks'
import { IIconPickerControlProps } from './types'

/**
 * @category Reusable Component
 */
export function useIconPickerControl(props: IIconPickerControlProps) {
  const items = useFabricIcons(props.includeFluentIcons)

  /**
   * Returns the default selected key for the `IconPickerControl`.
   *
   * @returns The default selected key as a string.
   */
  const getDefaultSelectedKey = () => {
    const { defaultSelected, model, name } = props
    if (defaultSelected) return defaultSelected
    if (model && name) return model.value(name) as string
  }

  /**
   * Clears the selected icon and updates the model.
   */
  const onClear = () => {
    const { onSelected, model, name } = props
    if (onSelected) {
      onSelected(null)
    }
    if (model && name) {
      model.set(name, null)
    }
  }

  /**
   * Callback function that is called when an item is selected from the suggestion list.
   *
   * @param item - The selected suggestion item.
   */
  const onSelected = (item: ISuggestionItem) => {
    const { onSelected, model, name } = props
    if (onSelected) onSelected(item?.data)
    if (model && name) model.set(name, item?.data)
  }

  return {
    ...props,
    items,
    defaultSelectedKey: getDefaultSelectedKey(),
    onSelected,
    onClear,
    itemIcons: true,
    getIcon: (item: ISuggestionItem<IIconProps>) => {
      return item.iconName
    }
  } as IAutocompleteControlProps
}