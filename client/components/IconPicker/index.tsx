import { css } from '@fluentui/react'
import { Autocomplete } from 'components/Autocomplete'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './IconPicker.module.scss'
import { IIconPickerProps } from './types'
import { useIconPicker } from './useIconPicker'

/**
 * Icon picker using `<Autocomplete />` to select
 * icons from `@uifabric/icons`
 *
 * @remarks Can be controlled with a model using props
 * `model` and `name`
 *
 * @category Reusable Component
 */
export const IconPicker: ReusableComponent<IIconPickerProps> = (props) => {
  const autoCompleteProps = useIconPicker(props)
  return (
    <div
      className={css(IconPicker.className, props.className)}
      hidden={props.hidden}
    >
      <Autocomplete {...autoCompleteProps} />
    </div>
  )
}

IconPicker.displayName = 'IconPicker'
IconPicker.className = styles.iconPicker
