/* eslint-disable tsdoc/syntax */
import { Autocomplete } from 'components/Autocomplete'
import { ReusableComponent } from 'components/types'
import { useFabricIcons } from 'hooks'
import React from 'react'
import { omit } from 'underscore'
import styles from './IconPicker.module.scss'
import { IIconPickerProps } from './types'

/**
 * Icon picker using `<Autocomplete />` to select
 * icons from `@uifabric/icons`
 *
 * @category Reusable Component
 */
export const IconPicker: ReusableComponent<IIconPickerProps> = (props) => {
  const icons = useFabricIcons()
  return (
    <div className={`${styles.root} ${props.className}`} hidden={props.hidden}>
      <Autocomplete
        {...omit(props, 'className')}
        defaultSelectedKey={props.defaultSelected}
        required={props.required}
        items={icons}
        itemIcons={{ style: {} }}
        width={props.width}
        placeholder={props.placeholder}
        onClear={() => props.onSelected(null)}
        onSelected={(item) => props.onSelected(item.data)}
      />
    </div>
  )
}
