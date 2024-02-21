import { IIconProps } from '@fluentui/react'
import {
  IAutocompleteControlProps,
  ISuggestionItem
} from 'components/FormControl/AutocompleteControl'
import { useFabricIcons } from 'hooks'
import { IIconPickerControlProps } from './types'
import { useMemo } from 'react'

/**
 * Handles the logic for the `IconPickerControl`.
 *
 * @param props Props for the `IconPickerControl`.
 *
 * @returns Props for the `AutocompleteControl`.
 */
export function useIconPickerControl(props: IIconPickerControlProps) {
  const items = useFabricIcons(props.includeFluentIcons)
  const value = props.model?.value<string>(props.name)

  /**
   * Returns the default selected key for the `IconPickerControl`.
   *
   * @returns The default selected key as a string.
   */
  const selectedKey = useMemo(() => {
    if (props.random) {
      const randomIndex = Math.floor(Math.random() * items.length)
      return items[randomIndex].key
    }
    if (props.defaultSelected) return props.defaultSelected
    if (props.model && props.name) return value
  }, [props.defaultSelected, value])

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
    selectedKey,
    onSelected,
    onClear,
    itemIcons: true,
    getIcon: (item: ISuggestionItem<IIconProps>) => item.iconName
  } as IAutocompleteControlProps
}
