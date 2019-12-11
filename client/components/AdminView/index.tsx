
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

    return (
        <div>
            <Pivot styles={{ root: { display: 'flex', flexWrap: 'wrap' } }}>
                <PivotItem itemKey='reports' headerText='Reports' itemIcon='ReportDocument' style={{ padding: 10 }}>
                    <Reports />
                </PivotItem>
                <PivotItem itemKey='users' headerText='Users' itemIcon='FabricUserFolder' style={{ padding: 10 }}>
                    <List enableShimmer={loading} items={value(data, 'users', [])} columns={USER_LIST_COLUMNS} />
                </PivotItem>
                <PivotItem itemKey='weeks' headerText='Weeks' itemIcon='CalendarWeek' style={{ padding: 10 }}>
                    <List enableShimmer={loading} items={value(data, 'weeks', [])} columns={WEEK_LIST_COLUMNS} />
                </PivotItem>
                <PivotItem itemKey='customers' headerText='Customers' itemIcon='Work' style={{ padding: 10 }}>
                    <Pivot>
                        <PivotItem itemKey='new' headerText='Create new' itemIcon='CalculatorAddition' style={{ padding: 10 }}>
                            <CreateCustomerForm />
                        </PivotItem>
                        <PivotItem itemKey='edit' headerText='Edit' itemIcon='Edit' style={{ padding: 10 }} />
                    </Pivot>
                </PivotItem>
                <PivotItem itemKey='projects' headerText='Projects' itemIcon='ProjectCollection' style={{ padding: 10 }}>
                    <Pivot>
                        <PivotItem itemKey='new' headerText='Create new' itemIcon='CalculatorAddition' style={{ padding: 10 }}>
                            <CreateProjectForm />
                        </PivotItem>
                        <PivotItem itemKey='edit' headerText='Edit' itemIcon='Edit' style={{ padding: 10 }} />
                    </Pivot>
                </PivotItem>
            </Pivot>
        </div>
    );
}