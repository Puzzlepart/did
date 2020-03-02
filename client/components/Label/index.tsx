
import * as React from 'react';
import { ILabel } from 'interfaces';

/**
 * @component Label
 * @description
 */
export const Label = (props: ILabel) => {
    return <div className='c-Label' style={{ backgroundColor: props.color }} title={props.description}>{props.name}</div>;
}