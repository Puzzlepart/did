import React from 'react'
import { AutocompleteControl } from '../AutocompleteControl'
import { FormInputControlComponent } from '../types'
import { IIconPickerControlProps } from './types'
import { useIconPickerControl } from './useIconPickerControl'

/**
 * Icon picker using `<Autocomplete />` to select
 * icons from `@uifabric/icons`.
 *
 * @category Reusable Component
 */
export const IconPickerControl: FormInputControlComponent<
  IIconPickerControlProps
> = (props) => {
  const autoCompleteProps = useIconPickerControl(props)
  return <AutocompleteControl {...autoCompleteProps} />
}

IconPickerControl.displayName = 'IconPickerControl'