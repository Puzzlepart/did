
import * as React from 'react';
import { ILabel } from 'interfaces';
import validator from 'validator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

/**
 * @component EntityLabel
 * @description
 */
export const EntityLabel = (props: ILabel) => {
    return <div className='c-EntityLabel' style={{ backgroundColor: props.color }} title={props.description}>
        {props.icon && <Icon iconName={props.icon} style={{ marginRight: 4 }} />}
        <span>{validator.isEmpty(props.name) ? 'My new label' : props.name}</span>
    </div>;
}