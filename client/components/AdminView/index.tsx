
import { useQuery } from '@apollo/react-hooks';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { CreateCustomerForm } from './CreateCustomerForm';
import { CreateProjectForm } from './CreateProjectForm';
import GET_DATA from './GET_DATA';
import { Reports } from './Reports';
import { USER_LIST_COLUMNS } from './USER_LIST_COLUMNS';
import { WEEK_LIST_COLUMNS } from './WEEK_LIST_COLUMNS';

/**
 * @component AdminView
 * @description
 */
export const AdminView = () => {
    const { data, loading } = useQuery(GET_DATA);

    let [, path] = document.location.hash.substring(1).split('=');
    let paths = (path || '').split('/');

    const onLinkClick = (item: PivotItem, ev: React.MouseEvent<any>) => document.location.hash = `#path=${item.props.itemID}`;

    const linkStyle = { padding: 10 };

    return (
        <div>
            <Pivot styles={{ root: { display: 'flex', flexWrap: 'wrap' } }} onLinkClick={onLinkClick} defaultSelectedKey={paths[0]}>
                <PivotItem itemID='reports' itemKey='reports' headerText='Reports' itemIcon='ReportDocument' style={linkStyle}>
                    <Reports />
                </PivotItem>
                <PivotItem itemID='users' itemKey='users' headerText='Users' itemIcon='FabricUserFolder' style={linkStyle}>
                    <List enableShimmer={loading} items={value(data, 'users', [])} columns={USER_LIST_COLUMNS} />
                </PivotItem>
                <PivotItem itemID='weeks' itemKey='weeks' headerText='Weeks' itemIcon='CalendarWeek' style={linkStyle}>
                    <List enableShimmer={loading} items={value(data, 'weeks', [])} columns={WEEK_LIST_COLUMNS} />
                </PivotItem>
                <PivotItem itemID='customers' itemKey='customers' headerText='Customers' itemIcon='Work' style={linkStyle}>
                    <Pivot defaultSelectedKey={paths[1]} onLinkClick={onLinkClick}>
                        <PivotItem itemID='customers/new' itemKey='new' headerText='Create new' itemIcon='CalculatorAddition' style={linkStyle}>
                            <CreateCustomerForm />
                        </PivotItem>
                    </Pivot>
                </PivotItem>
                <PivotItem itemID='projects' itemKey='projects' headerText='Projects' itemIcon='ProjectCollection' style={linkStyle}>
                    <Pivot defaultSelectedKey={paths[1]} onLinkClick={onLinkClick}>
                        <PivotItem itemID='projects/new' itemKey='new' headerText='Create new' itemIcon='CalculatorAddition' style={linkStyle}>
                            <CreateProjectForm />
                        </PivotItem>
                    </Pivot>
                </PivotItem>
            </Pivot>
        </div>
    );
}