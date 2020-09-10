import { Autocomplete } from 'components/Autocomplete'
import { Label } from 'office-ui-fabric-react/lib/Label'
import * as React from 'react'
import { humanize } from 'underscore.string'
import { getIcons } from '../../common/icons'
import { IIconPickerProps } from './types'

/**
 * @category IconPicker
 */
export const IconPicker = (props: IIconPickerProps) => {
    const items = React.useMemo(() => getIcons().map(key => ({
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
                {...props}
                disabled={false}
                items={items}
                width={props.width}
                placeholder={props.placeholder}
                onClear={() => props.onSelected(null)}
                onSelected={item => props.onSelected(item.data)} />
        </div>
    )
}