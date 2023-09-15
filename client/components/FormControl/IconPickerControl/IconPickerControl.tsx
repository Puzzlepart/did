import { css } from '@fluentui/react'
import React from 'react'
import { AutocompleteControl } from '../AutocompleteControl'
import { FormInputControlComponent } from '../types'
import styles from './IconPickerControl.module.scss'
import { IIconPickerControlProps } from './types'
import { useIconPickerControl } from './useIconPickerControl'

/**
 * Icon picker using `<Autocomplete />` to select
 * icons from `@uifabric/icons`
 *
 * @remarks Can be controlled with a model using props
 * `model` and `name`
 *
 * @category Reusable Component
 */
export const IconPickerControl: FormInputControlComponent<IIconPickerControlProps> =
  (props) => {
    const autoCompleteProps = useIconPickerControl(props)
    return (
      <div
        className={css(IconPickerControl.className, props.className)}
        hidden={props.hidden}
      >
        <AutocompleteControl {...autoCompleteProps} />
      </div>
    )
  }

IconPickerControl.displayName = 'IconPickerControl'
IconPickerControl.className = styles.iconPickerControl
