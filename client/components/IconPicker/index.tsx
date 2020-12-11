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
        text: humanize(iconName),
        searchValue: [iconName, humanize(iconName)].join(' '),
        iconName: iconName,
        data: iconName
      })),
    []
  )

  const defaultSelectedItem = useMemo(() =>
    props.defaultSelected &&
    find(items, (i) => i.key === props.defaultSelected)
    , [props.defaultSelected])

  return (
    <div className={`${styles.root} ${props.className}`} hidden={props.hidden}>
      <Autocomplete
        {...omit(props, 'className')}
        defaultSelectedItem={defaultSelectedItem}
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
