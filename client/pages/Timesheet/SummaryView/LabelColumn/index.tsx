import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';

/**
 * @component LabelColumn
 * @category Timesheet
 */
export const LabelColumn = ({ row }) => {
    if (row.label) return <div containerStyle={{ fontWeight: 500 }}>{row.label}</div>;
        
    return (
        <>
            <div containerStyle={{ display: 'inline-block', verticalAlign: 'top', width: 30 }}>
                <Icon iconName={row.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
            </div>
            <div containerStyle={{ display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 30px)' }}>
                <div>{row.project.name}</div>
                <div containerStyle={{ fontSize: '7pt' }}>for {row.customer.name}</div>
            </div>
        </>
    );
}