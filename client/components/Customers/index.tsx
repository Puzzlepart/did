import { CreateCustomerForm } from 'components/Customers/CreateCustomerForm';
import resource from 'i18n';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { CustomerList } from './CustomerList';
import { ICustomerProps } from './ICustomerProps';

/**
 * @category Customers
 */
function getPath(): string[] {
    let [, path] = document.location.hash.substring(1).split('=');
    return (path || '').split('/');
}

/**
 * @category Customers
 */
export const Customers = (props: ICustomerProps) => {
    const path = getPath();
    const onLinkClick = (item: PivotItem) => document.location.hash = `#path=${item.props.itemID}`;

    return (
        <Pivot
            styles={{ itemContainer: { paddingTop: 10 } }}
            onLinkClick={onLinkClick}
            defaultSelectedKey={path[0]}>
            <PivotItem itemID='search' itemKey='search' headerText={resource('COMMON.SEARCH_TEXT')} itemIcon='FabricFolderSearch'>
                <CustomerList user={props.user} />
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText={resource('COMMON.CREATE_NEW_TEXT')} itemIcon='AddTo'>
                <CreateCustomerForm />
            </PivotItem>
        </Pivot >
    );
}