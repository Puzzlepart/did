
import { useQuery } from '@apollo/react-hooks';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { AdminSummaryView } from './AdminSummaryView';
import GET_USERS from './GET_USERS';
import { USER_LIST_COLUMNS } from './USER_LIST_COLUMNS';

function getPath(): string[] {
    let [, path] = document.location.hash.substring(1).split('=');
    return (path || '').split('/');
}

/**
 * @component AdminView
 * @description
 */
export const AdminView = () => {
    const { data, loading } = useQuery(GET_USERS);

    let path = getPath();

    const onLinkClick = (item: PivotItem) => document.location.hash = `#path=${item.props.itemID}`;

    const linkStyle = { padding: 10 };

    return (
        <div className='c-AdminView'>
            <Pivot onLinkClick={onLinkClick} defaultSelectedKey={path[0]}>
                <PivotItem itemID='users' itemKey='users' headerText='Users' itemIcon='FabricUserFolder' style={linkStyle}>
                    <List
                        enableShimmer={loading}
                        items={value(data, 'users', [])}
                        columns={USER_LIST_COLUMNS} />
                </PivotItem>
                <PivotItem itemID='summary' itemKey='summary' headerText='Summary' itemIcon='CalendarWeek' style={linkStyle}>
                    <AdminSummaryView
                        onLinkClick={onLinkClick}
                        defaultSelectedKey={path[1]}
                        defaultRange={5}
                        loadingText='Loading summary...' />
                </PivotItem>
            </Pivot>
        </div>
    );
}