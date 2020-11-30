import { getIcons } from 'common/icons'
import { Autocomplete } from 'components/Autocomplete'
import React, { FunctionComponent, useMemo } from 'react'
import { find, omit } from 'underscore'
import { humanize } from 'underscore.string'
import { IIconPickerProps } from './types'
import styles from './IconPicker.module.scss'

export const IconPicker: FunctionComponent<IIconPickerProps> = (props: IIconPickerProps) => {
  const items = useMemo(
    () =>
      getIcons().map((iconName) => ({
        key: iconName,
        displayValue: humanize(iconName),
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
        defaultSelectedItem={
          props.defaultSelected && find(items, (i) => i.key === props.defaultSelected)
        }
        required={props.required}
        items={items}
        showIcons={true}
        width={props.width}
        placeholder={props.placeholder}
        onClear={() => props.onSelected(null)}
        onSelected={(item) => props.onSelected(item.data)}
      />
    </div>
  )
}
