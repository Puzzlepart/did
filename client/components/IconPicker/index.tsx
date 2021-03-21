/* eslint-disable tsdoc/syntax */
import { getIcons } from 'common/icons'
import { Autocomplete } from 'components/Autocomplete'
import React, { useMemo } from 'react'
import { omit } from 'underscore'
import { humanize } from 'underscore.string'
import styles from './IconPicker.module.scss'
import { IIconPickerProps } from './types'

/**
 * Icon picker using `<Autocomplete />` to select
 * icons from `@uifabric/icons`
 *
 * @category Function Component
 */
export const IconPicker: React.FC<IIconPickerProps> = (props) => {
  const items = useMemo(
    () =>
      getIcons().map((iconName) => ({
        key: iconName,
        text: humanize(iconName),
        searchValue: [iconName, humanize(iconName)].join(' '),
        iconName: iconName,
        data: iconName
      })),
    []
  )

  return (
    <div className={`${styles.root} ${props.className}`} hidden={props.hidden}>
      <Autocomplete
        {...omit(props, 'className')}
        defaultSelectedKey={props.defaultSelected}
        required={props.required}
        items={items}
        itemIcons={{ style: {} }}
        width={props.width}
        placeholder={props.placeholder}
        onClear={() => props.onSelected(null)}
        onSelected={(item) => props.onSelected(item.data)}
      />
    </div>
  )
}
