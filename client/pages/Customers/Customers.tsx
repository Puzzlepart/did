import { useQuery } from '@apollo/react-hooks';
import { value as value } from 'helpers';
import resource from 'i18n';
import { ICustomer } from 'interfaces';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { CreateCustomerForm } from 'pages/Customers/CreateCustomerForm';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import _ from 'underscore';
import { CustomerDetails } from './CustomerDetails';
import { CustomerList } from './CustomerList';
import GET_CUSTOMERS, { IGetCustomersData } from './GET_CUSTOMERS';

/**
 * @category Customers
 */
export const Customers = () => {
    const params = useParams<{ key: string }>();
    const [selected, setSelected] = React.useState<ICustomer>(null);
    const { loading, error, data } = useQuery<IGetCustomersData>(GET_CUSTOMERS, { fetchPolicy: 'cache-first' });

    const customers = value<ICustomer[]>(data, 'customers', []);

    React.useEffect(() => {
        if (!selected && params.key) {
            const _selected = _.find(customers, p => p.id === params.key.toUpperCase());
            setSelected(_selected);
        }
    }, [params.key, customers]);

    return (
        <Pivot styles={{ itemContainer: { paddingTop: 10 } }}>
            <PivotItem itemID='search' itemKey='search' headerText={resource('COMMON.SEARCH_TEXT')} itemIcon='FabricFolderSearch'>
                {error
                    ? <MessageBar messageBarType={MessageBarType.error}>{resource('COMMON.GENERIC_ERROR_TEXT')}</MessageBar>
                    : (
                        <>
                            <CustomerList
                                enableShimmer={loading}
                                items={customers}
                                searchBox={{ placeholder: resource('COMMON.SEARCH_PLACEHOLDER') }}
                                selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                                height={selected && 400} />
                            {selected && <CustomerDetails customer={selected} />}
                        </>
                    )}
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText={resource('COMMON.CREATE_NEW_TEXT')} itemIcon='AddTo'>
                <CreateCustomerForm />
            </PivotItem>
        </Pivot >
    );
}