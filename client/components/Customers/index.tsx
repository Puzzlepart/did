import { useMutation, useQuery } from '@apollo/react-hooks';
import { CreateCustomerForm } from 'components/Customers/CreateCustomerForm';
import { getValueTyped as value, parseUrlHash, updateUrlHash } from 'helpers';
import resource from 'i18n';
import { ICustomer } from 'interfaces';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import _ from 'underscore';
import { CustomerDetails } from './CustomerDetails';
import { CustomerList } from './CustomerList';
import DELETE_CUSTOMER, { IDeleteCustomerVariables } from './DELETE_CUSTOMER';
import GET_CUSTOMERS, { IGetCustomersData } from './GET_CUSTOMERS';
import { ICustomerProps } from './ICustomerProps';

/**
 * @component Customers
 */
export const Customers = (props: ICustomerProps) => {
    const [selected, setSelected] = React.useState<ICustomer>(null);
    const { loading, error, data, refetch } = useQuery<IGetCustomersData>(GET_CUSTOMERS, { fetchPolicy: 'cache-first' });
    const [deleteCustomer] = useMutation<any, IDeleteCustomerVariables>(DELETE_CUSTOMER);

    /**
     * On delete customer
     */
    const onDeleteCustomer = async (): Promise<void> => {
        const { data } = await deleteCustomer({ variables: { key: selected.key.toString() } });
        window.location.hash = '';
        if (data.result.success) {
            setSelected(null);
            refetch();
        }
    }

    const customers = value<ICustomer[]>(data, 'customers', []);

    const urlHash = parseUrlHash<{ key: string, tab: string }>();
    const onLinkClick = (item: PivotItem) => updateUrlHash({ tab: item.props.itemID }, false);

    if (urlHash.key) {
        let _selected = _.find(customers, c => c.id === urlHash.key);
        if (_selected && !selected) setSelected(_selected);
    }

    return (
        <Pivot
            styles={{ itemContainer: { paddingTop: 10 } }}
            onLinkClick={onLinkClick}
            defaultSelectedKey={urlHash.tab}>
            <PivotItem itemID='search' itemKey='search' headerText={resource('COMMON.SEARCH_TEXT')} itemIcon='FabricFolderSearch'>
                {error
                    ? <MessageBar messageBarType={MessageBarType.error}>{resource('COMMON.GENERIC_ERROR_TEXT')}</MessageBar>
                    : (
                        <CustomerList
                            enableShimmer={loading}
                            items={customers}
                            searchBox={{ placeholder: resource('COMMON.SEARCH_PLACEHOLDER') }}
                            selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                            height={selected && 400} />
                    )}
                {selected && <CustomerDetails customer={selected} user={props.user} onDelete={onDeleteCustomer} />}
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText={resource('COMMON.CREATE_NEW_TEXT')} itemIcon='AddTo'>
                <CreateCustomerForm />
            </PivotItem>
        </Pivot >
    );
}