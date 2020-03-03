import { CreateCustomerForm } from 'components/Customers/CreateCustomerForm';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { CustomerList } from './CustomerList';
import { ICustomerProps } from './ICustomerProps';

export const Customers = (props: ICustomerProps) => {
    return (
        <Pivot styles={{ itemContainer: { paddingTop: 10 } }}>
            <PivotItem itemID='search' itemKey='search' headerText='Search' itemIcon='FabricFolderSearch'>
               <CustomerList user={props.user} />
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText='Create new' itemIcon='AddTo'>
                <CreateCustomerForm />
            </PivotItem>
        </Pivot >
    );
}