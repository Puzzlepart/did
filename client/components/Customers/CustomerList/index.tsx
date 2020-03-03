import { useMutation, useQuery } from '@apollo/react-hooks';
import { IColumn, List, SelectionMode } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { ICustomer } from 'interfaces';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { useState } from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { getHash } from 'utils/getHash';
import { CustomerDetails } from './CustomerDetails';
import DELETE_CUSTOMER from './DELETE_CUSTOMER';
import { GET_CUSTOMERS } from './GET_CUSTOMERS';

/**
 * @component CustomerList
 */
export const CustomerList = () => {
    const [selected, setSelected] = useState<ICustomer>(null);
    const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS, { fetchPolicy: 'network-only' });
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

    const onDelete = async (): Promise<void> => {
        await deleteCustomer({ variables: { key: selected.key } });
        window.location.hash = '';
        setSelected(null);
        refetch();
    }

    const columns: IColumn[] = [
        col(
            'icon',
            '',
            { maxWidth: 35, minWidth: 35 },
            (customer: ICustomer) => <Icon iconName={customer.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />,
        ),
        col('key', 'Key', { maxWidth: 120 }),
        col('name', 'Name', { maxWidth: 300 }),
    ];

    let customers = value<ICustomer[]>(data, 'customers', []);

    if (getHash()) {
        let [_selected] = customers.filter(c => c.id === getHash());
        if (_selected && !selected) setSelected(_selected);
    }

    return (
        <>
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
            {selected && <CustomerDetails customer={selected} onDelete={onDelete} />}
        </>
    );
};
