import { useQuery } from '@apollo/react-hooks';
import { CreateCustomerForm } from 'components/Customers/CreateCustomerForm';
import { IColumn, List, SelectionMode } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { ICustomer } from 'interfaces';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useState } from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { getHash } from 'utils/getHash';
import { CustomerDetails } from './CustomerDetails';
import { GET_CUSTOMERS } from './GET_CUSTOMERS';

function getPath(): string[] {
    let [, path] = document.location.hash.substring(1).split('=');
    return (path || '').split('/');
}

export const Customers = () => {
    const [selected, setSelected] = useState<ICustomer>(null);
    const { loading, error, data } = useQuery(GET_CUSTOMERS, { fetchPolicy: 'cache-first' });

    const columns: IColumn[] = [
        col(
            'icon',
            '',
            { maxWidth: 35, minWidth: 35 },
            (customer: ICustomer) => <Icon iconName={customer.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />,
        ),
        col('key', 'Key', { maxWidth: 120 }),
        col('name', 'Name'),
    ];

    let customers = value<ICustomer[]>(data, 'customers', []);

    const path = getPath();
    const onLinkClick = (item: PivotItem) => document.location.hash = `#path=${item.props.itemID}`;

    if (getHash()) {
        let [_selected] = customers.filter(c => c.id === getHash());
        if (_selected && !selected) setSelected(_selected);
    }

    return (
        <Pivot
            styles={{ itemContainer: { paddingTop: 10 } }}
            onLinkClick={onLinkClick}
            defaultSelectedKey={path[0]}>
            <PivotItem itemID='search' itemKey='search' headerText='Search' itemIcon='FabricFolderSearch'>
                {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
                {!error && (
                    <List
                        enableShimmer={loading}
                        items={customers}
                        columns={columns}
                        searchBox={{ placeholder: 'Search...' }}
                        selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                        height={350} />
                )}
                {selected && <CustomerDetails customer={selected} />}
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText='Create new' itemIcon='AddTo'>
                <CreateCustomerForm />
            </PivotItem>
        </Pivot >
    );
}