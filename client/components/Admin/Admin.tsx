
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AdminSummaryView from './AdminSummaryView';
import { Labels } from './Labels';
import { Users } from './Users';

/**
 * @category Admin
 */
export const Admin = () => {
    const history = useHistory();
    const { view } = useParams<{ view: string }>();
    return (
        <div className='c-Admin'>
            <Pivot defaultSelectedKey={view} onLinkClick={item => history.push(`/admin/${item.props.itemKey}`)}>
                <PivotItem itemID='summary' itemKey='summary' headerText='Summary' itemIcon='CalendarWeek' style={{ padding: 10 }}>
                    <AdminSummaryView />
                </PivotItem>
                <PivotItem itemID='users' itemKey='users' headerText='Users' itemIcon='FabricUserFolder' style={{ padding: 10 }}>
                    <Users />
                </PivotItem>
                <PivotItem itemID='labels' itemKey='labels' headerText='Labels' itemIcon='Label' style={{ padding: 10 }}>
                    <Labels />
                </PivotItem>
            </Pivot>
        </div>
    );
}