import {LabelInput, LabelObject} from 'types';

/**
 * @category EntityLabel
 */
export interface IEntityLabelProps {
	label: LabelObject | LabelInput;
	size?: 'xsmall' | 'small' | 'medium' | 'large';
}
