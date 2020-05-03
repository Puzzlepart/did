import * as React from 'react';
import { ILabel } from 'interfaces';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import _ from 'underscore.string';

/**
 * @category EntityLabel
 */
export const EntityLabel = (label: ILabel) => {
    return <div className='c-EntityLabel' style={{ backgroundColor: label.color }} title={label.description}>
        {label.icon && <Icon iconName={label.icon} style={{ marginRight: 4 }} />}
        <span>{_.isBlank(label.name) ? 'My new label' : label.name}</span>
    </div>;
}