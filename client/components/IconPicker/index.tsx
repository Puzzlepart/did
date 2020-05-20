import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { humanize } from 'underscore.string'
import { getIcons } from '../../common/icons'

/**
 * @category IconPicker
 */
export type IIconPickerProps = IDropdownProps

/**
 * @category IconPicker
 */
export const IconPicker = (props: IIconPickerProps) => {
    const { t } = useTranslation('common')

    function onRenderOption(option: IDropdownOption): JSX.Element {
        return (
            <div>
                <Icon style={{ marginRight: 8 }} iconName={option.key as string} aria-hidden='true' title={option.text} />
                <span>{option.text}</span>
            </div>
        )
    };

    function onRenderTitle([option]: IDropdownOption[]): JSX.Element {
        return (
            <div>
                <Icon style={{ marginRight: 8 }} iconName={option.key as string} aria-hidden='true' title={option.text} />
                <span>{option.text}</span>
            </div>
        )
    };

    const options = React.useMemo(() => getIcons(100).map(key => ({ key, text: humanize(key) })), [])

    return (
        <Dropdown
            className={props.className}
            styles={props.styles}
            label={t('iconLabel')}
            title={t('iconLabel')}
            options={options}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            onRenderTitle={onRenderTitle}
            onRenderOption={onRenderOption} />
    )
}