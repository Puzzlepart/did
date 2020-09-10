import { Autocomplete } from 'components/Autocomplete'
import { Label } from 'office-ui-fabric-react/lib/Label'
import React, { useMemo } from 'react'
import { find, omit } from 'underscore'
import { humanize } from 'underscore.string'
import { getIcons } from '../../common/icons'
import { IIconPickerProps } from './types'

/**
 * @category IconPicker
 */
export const IconPicker = (props: IIconPickerProps) => {
    const items = useMemo(() => getIcons().map(key => ({
        key,
        displayValue: humanize(key),
        searchValue: [key, humanize(key)].join(' '),
        iconName: key,
        data: key,
    })), [])

    return (
        <div className={props.className} hidden={props.hidden}>
            <Label>{props.label}</Label>
            <Autocomplete
                {...omit(props, 'className')}
                defaultSelectedItem={props.defaultSelected && find(items, i => i.key === props.defaultSelected)}
                disabled={false}
                items={items}
                showIcons={true}
                width={props.width}
                placeholder={props.placeholder}
                onClear={() => props.onSelected(null)}
                onSelected={item => props.onSelected(item.data)} />
        </div>
    )
}