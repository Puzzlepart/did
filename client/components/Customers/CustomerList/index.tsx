import { EntityLabel } from 'common/components/EntityLabel';
import List from 'common/components/List';
import resource from 'i18n';
import { ICustomer } from 'interfaces/ICustomer';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { generateColumn as col } from 'utils/generateColumn';
import { ICustomerListProps } from './ICustomerListProps';

/**
 * Generate column definitions
 * 
 * @category Customers
 */
export const CustomerListColumns = (): IColumn[] => ([
    col(
        'icon',
        '',
        { maxWidth: 35, minWidth: 35 },
        (customer: ICustomer) => {
            if (customer.inactive) {
                return <Icon title={resource('CUSTOMERS.CUSTOMER_INACTIVE_TEXT')} iconName='Warning' styles={{ root: { fontSize: 16, color: '#ffbf00' } }} />;
            }
            return <Icon iconName={customer.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />;
        },
    ),
    col('key', 'Key', { maxWidth: 120 }),
    col(
        'name',
        'Name',
        { maxWidth: 300 },
        (customer: ICustomer) => <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
    ),
    col(
        'labels',
        '',
        {},
        (customer: ICustomer) => customer.labels.map((label, idx) => <EntityLabel key={idx} {...label} />),
    ),
])

/**
 * @category Customers
 */
export const CustomerList = (props: ICustomerListProps) => {
    const [items, setItems] = React.useState([...props.items]);

    /**
     * On toggle inactive
     * 
     * @param {React.MouseEvent} _event Event
     * @param {boolean} checked Is checked
     */
    const onToggleInactive = (_event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        setItems([...props.items].filter(customer => checked ? true : !customer.inactive));
    }

    React.useEffect(() => setItems([...props.items].filter(customer => !customer.inactive)), [props.items]);

    return (
        <List
            {...props}
            items={items}
            columns={CustomerListColumns()}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Toggle
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                offText={resource('COMMON.TOGGLE_INACTIVE_OFF_TEXT')}
                                onText={resource('COMMON.TOGGLE_INACTIVE_ON_TEXT')}
                                onChange={onToggleInactive} />
                        ),
                    }
                ],
                farItems: []
            }} />
    );
};
