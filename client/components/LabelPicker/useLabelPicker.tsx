import {useQuery} from '@apollo/client';
import {useEffect, useRef, useState} from 'react';
import {LabelObject} from 'types';
import {omit} from 'underscore';
import $labels from './labels.gql';
import {ILabelPickerProps} from './types';

export function useLabelPicker({
	onChange,
	defaultSelectedKeys
}: ILabelPickerProps) {
	const {data} = useQuery($labels, {fetchPolicy: 'cache-first'});
	const [labels, setLabels] = useState<LabelObject[]>([]);
	const [selectedLabels, setSelectedLabels] = useState<LabelObject[]>([]);
	const [showCallout, setShowCallout] = useState<boolean>(false);

	function onToggleLabel(label: LabelObject) {
		const _selectedLabels = [...selectedLabels];
		const index = _selectedLabels.indexOf(label);
		if (index === -1) {
			_selectedLabels.push(label);
			setSelectedLabels(_selectedLabels);
		} else {
			_selectedLabels.splice(index, 1);
			setSelectedLabels(_selectedLabels);
		}

		onChange(_selectedLabels);
	}

	useEffect(() => {
		if (data?.labels) {
			const _labels: LabelObject[] = data.labels.map((lbl: any) =>
				omit(lbl, '__typename')
			);
			setLabels(_labels);
			if (defaultSelectedKeys) {
				const _selectedLabels = _labels.filter(lbl =>
					defaultSelectedKeys.includes(lbl.name)
				);
				setSelectedLabels(_selectedLabels);
			}
		}
	}, [data]);

	const ref = useRef(null);

	return {
		onToggleLabel,
		showCallout,
		setShowCallout,
		labels,
		selectedLabels,
		ref
	};
}
