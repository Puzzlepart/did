import ICONS from 'common/icons';
import { Dropdown, IDropdownProps, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { humanize } from 'underscore.string';

export interface IIconPickerProps extends IDropdownProps {

}

/**
 * @component IconPicker
 */
export const IconPicker = (props: IIconPickerProps) => {
    function onRenderOption(option: IDropdownOption): JSX.Element {
        return (
            <div>
                <Icon style={{ marginRight: 8 }} iconName={option.key as string} aria-hidden='true' title={option.text} />
                <span>{option.text}</span>
            </div>
        );
    };

    function onRenderTitle([option]: IDropdownOption[]): JSX.Element {
        return (
            <div>
                <Icon style={{ marginRight: 8 }} iconName={option.key as string} aria-hidden='true' title={option.text} />
                <span>{option.text}</span>
            </div>
        );
    };

    const options = ICONS.map(key => ({ key, text: humanize(key) }));

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