
import { useQuery } from '@apollo/react-hooks';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { AdminSummaryView } from './AdminSummaryView';
import { CreateCustomerForm } from './CreateCustomerForm';
import { CreateProjectForm } from './CreateProjectForm';
import GET_DATA from './GET_DATA';
import { Reports } from './Reports';
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
    const { data, loading } = useQuery(GET_DATA);

    let path = getPath();

    const onLinkClick = (item: PivotItem) => document.location.hash = `#path=${item.props.itemID}`;

    const linkStyle = { padding: 10 };

    return (
        <div>
            <Pivot styles={{ root: { display: 'flex', flexWrap: 'wrap' } }} onLinkClick={onLinkClick} defaultSelectedKey={path[0]}>
                <PivotItem itemID='reports' itemKey='reports' headerText='Reports' itemIcon='ReportDocument' style={linkStyle}>
                    <Reports />
                </PivotItem>
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
                        loadingText='Loading summary...'
                        valueFormat='Show last {0} weeks' />
                </PivotItem>
                <PivotItem itemID='customers' itemKey='customers' headerText='Customers' itemIcon='Work' style={linkStyle}>
                    <Pivot defaultSelectedKey={path[1]} onLinkClick={onLinkClick}>
                        <PivotItem itemID='customers/new' itemKey='new' headerText='Create new' itemIcon='CalculatorAddition' style={linkStyle}>
                            <CreateCustomerForm />
                        </PivotItem>
                    </Pivot>
                </PivotItem>
                <PivotItem itemID='projects' itemKey='projects' headerText='Projects' itemIcon='ProjectCollection' style={linkStyle}>
                    <Pivot defaultSelectedKey={path[1]} onLinkClick={onLinkClick}>
                        <PivotItem itemID='projects/new' itemKey='new' headerText='Create new' itemIcon='CalculatorAddition' style={linkStyle}>
                            <CreateProjectForm />
                        </PivotItem>
                    </Pivot>
                </PivotItem>
            </Pivot>
        </div>
    );
}