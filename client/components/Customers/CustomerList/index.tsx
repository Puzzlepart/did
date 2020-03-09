import { useMutation, useQuery } from '@apollo/react-hooks';
import { IColumn, List, SelectionMode } from 'components/List';
import { UserMessage } from 'components/UserMessage';
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
import GET_CUSTOMERS from './GET_CUSTOMERS';
import { ICustomerListProps } from './ICustomerListProps';

/**
 * @component CustomerList
 */
export const CustomerList = (props: ICustomerListProps) => {
    let [message, setMessage] = useState<{ text: string, type: MessageBarType }>(null);
    const [selected, setSelected] = useState<ICustomer>(null);
    const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS, { fetchPolicy: 'cache-first' });
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

    /**
     * On delete customer
     */
    const onDelete = async (): Promise<void> => {
        const { data } = await deleteCustomer({ variables: { key: selected.key } });
        window.location.hash = '';
        if (data.result.success) {
            setMessage({ text: `The customer ${selected.name} and connected projects was deleted.`, type: MessageBarType.remove });
            window.setTimeout(() => setMessage(null), 5000);
        }
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
            {message && <UserMessage style={{ marginTop: 10, marginBottom: 10 }} text={message.text} type={message.type} />}
            {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
            {!error && (
                <List
                    enableShimmer={loading}
                    items={customers}
                    columns={columns}
                    searchBox={{ placeholder: 'Search...' }}
                    selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                    height={selected && 400} />
            )}
            {selected && <CustomerDetails {...props} customer={selected} onDelete={onDelete} />}
        </>
    );
};
