
import resource from 'i18n';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AdminSummaryView from './AdminSummaryView';
import { Users } from './Users';
/**
 * @category Admin
 */
export const Admin = () => {
    const history = useHistory();
    const { view } = useParams<{ view: string }>();
    return (
        <div>
            <Pivot defaultSelectedKey={view} onLinkClick={item => history.push(`/admin/${item.props.itemKey}`)}>
                <PivotItem
                    itemID='users'
                    itemKey='users'
                    headerText={resource('ADMIN.USERS')}
                    itemIcon='FabricUserFolder'
                    containerStyle={{ padding: 10 }}>
                    <Users />
                </PivotItem>
                <PivotItem
                    itemID='summary'
                    itemKey='summary'
                    headerText={resource('ADMIN.SUMMARY')}
                    itemIcon='CalendarWeek'
                    containerStyle={{ padding: 10 }}>
                    <AdminSummaryView />
                </PivotItem>
            </Pivot>
        </div>
    );
}