
import * as React from 'react';
import { ILabelProps } from './ILabelProps';

/**
 * @component Label
 * @description
 */
export const Label = (props: ILabelProps) => {
    return <div className='c-Label' style={{ backgroundColor: props.color }} title={props.description}>{props.name}</div>;
}