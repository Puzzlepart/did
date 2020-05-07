import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { humanize } from 'underscore.string';
import { getIcons } from '../../common/icons';

/**
 * @category IconPicker
 */
export type IIconPickerProps = IDropdownProps

/**
 * @category IconPicker
 */
export const IconPicker = (props: IIconPickerProps) => {
    function onRenderOption(option: IDropdownOption): JSX.Element {
        return (
            <div>
                <Icon containerStyle={{ marginRight: 8 }} iconName={option.key as string} aria-hidden='true' title={option.text} />
                <span>{option.text}</span>
            </div>
        );
    };

    function onRenderTitle([option]: IDropdownOption[]): JSX.Element {
        return (
            <div>
                <Icon containerStyle={{ marginRight: 8 }} iconName={option.key as string} aria-hidden='true' title={option.text} />
                <span>{option.text}</span>
            </div>
        );
    };

    const options = getIcons(100).map(key => ({ key, text: humanize(key) }));

    return (
        <Dropdown
            styles={props.styles}
            label='Icon'
            title='Icon'
            options={options}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            onRenderTitle={onRenderTitle}
            onRenderOption={onRenderOption} />
    );
}