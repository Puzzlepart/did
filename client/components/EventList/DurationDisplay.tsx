import React, {HTMLProps, FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import DateUtils from 'DateUtils';
import {format} from 'office-ui-fabric-react';

export interface IDurationDisplayProps extends HTMLProps<HTMLDivElement> {
	displayFormat?: string;
	duration: number;
}

/**
 * @category Function Component
 */
export const DurationDisplay: FunctionComponent<IDurationDisplayProps> = (
	props: IDurationDisplayProps
): JSX.Element => {
	const {t} = useTranslation();
	let displayValue = DateUtils.getDurationString(props.duration, t);
	if (props.displayFormat) {
		displayValue = format(props.displayFormat, displayValue);
	}

	return <span style={props.style}>{displayValue}</span>;
};
