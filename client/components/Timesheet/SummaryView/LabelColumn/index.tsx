import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';

/**
 * @component LabelColumn
 * @description 
 */
export const LabelColumn = ({ row }) => {
    if (row.label) return <div style={{ fontWeight: 500 }}>{row.label}</div>;
        
    return (
        <>
            <div style={{ display: 'inline-block', verticalAlign: 'top', width: 30 }}>
                <Icon iconName={row.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 30px)' }}>
                <div>{row.project.name}</div>
                <div style={{ fontSize: '7pt' }}>for {row.customer.name}</div>
            </div>
        </>
    );
}