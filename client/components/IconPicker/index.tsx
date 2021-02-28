import {getIcons} from 'common/icons';
import {Autocomplete} from 'components/Autocomplete';
import React, {FunctionComponent, useMemo} from 'react';
import {omit} from 'underscore';
import {humanize} from 'underscore.string';
import styles from './IconPicker.module.scss';
import {IIconPickerProps} from './types';

/**
 * @category Function Component
 */
export const IconPicker: FunctionComponent<IIconPickerProps> = (
	props: IIconPickerProps
) => {
	const items = useMemo(
		() =>
			getIcons().map(iconName => ({
				key: iconName,
				text: humanize(iconName),
				searchValue: [iconName, humanize(iconName)].join(' '),
				iconName,
				data: iconName
			})),
		[]
	);

	return (
		<div className={`${styles.root} ${props.className}`} hidden={props.hidden}>
			<Autocomplete
				{...omit(props, 'className')}
				defaultSelectedKey={props.defaultSelected}
				required={props.required}
				items={items}
				itemIcons={{style: {}}}
				width={props.width}
				placeholder={props.placeholder}
				onClear={() => {
					props.onSelected(null);
				}}
				onSelected={item => {
					props.onSelected(item.data);
				}}
			/>
		</div>
	);
};
