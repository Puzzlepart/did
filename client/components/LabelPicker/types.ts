import {LabelObject} from 'types';

export interface ILabelPickerProps {
	className?: string;
	label: string;
	placeholder: string;
	defaultSelectedKeys?: string[];
	onChange: (labels: LabelObject[]) => void;
}
