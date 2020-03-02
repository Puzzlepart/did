
import * as React from 'react';
import { ILabel } from 'interfaces';

/**
 * @component EntityLabel
 * @description
 */
export const EntityLabel = (props: ILabel) => {
    return <div className='c-Label' style={{ backgroundColor: props.color }} title={props.description}>{props.name}</div>;
}