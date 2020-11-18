import { getIcons } from 'common/icons'
import { Autocomplete } from 'components/Autocomplete'
import React, { useMemo } from 'react'
import { find, omit } from 'underscore'
import { humanize } from 'underscore.string'
import { IIconPickerProps } from './types'

export const IconPicker = (props: IIconPickerProps) => {
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
    <div className={props.className} hidden={props.hidden}>
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
