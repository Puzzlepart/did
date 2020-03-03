import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PROJECTS } from 'components/Projects/GET_PROJECTS';
import { ProjectList } from 'components/Projects/ProjectList';
import { getValueTyped as value } from 'helpers';
import { IProject } from 'interfaces';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { ConfirmDeleteDialog } from '../ConfirmDeleteDialog';
import DELETE_CUSTOMER from './DELETE_CUSTOMER';
import { ICustomerDetailsProps } from './ICustomerDetailsProps';

export const CustomerDetails = ({ customer }: ICustomerDetailsProps) => {
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { customerKey: value<string>(customer, 'key', '') } });
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

    return (
        <div className='c-CustomerDetails'>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h3>{customer.name}</h3>
                    </div>
                    <div className="col-sm" style={{ textAlign: 'right' }}>
                        <DefaultButton
                            text='Delete customer'
                            iconProps={{ iconName: 'Delete' }}
                            onClick={_ => setConfirmDelete(true)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <p>{customer.description}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Link href={customer.webLink}>{customer.webLink}</Link>
                    </div>
                </div>
                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-sm">
                        {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
                        {!error && (
                            <ProjectList
                                items={value<IProject[]>(data, 'projects', [])}
                                enableShimmer={loading}
                                searchBox={{ placeholder: `Search in projects...` }}
                                renderLink={true}
                                height={300} />
                        )}
                    </div>
                </div>
            </div>
            {confirmDelete && (
                <ConfirmDeleteDialog
                    customer={customer}
                    projects={value<IProject[]>(data, 'projects', [])}
                    onDismiss={_ => setConfirmDelete(false)}
                    onConfirm={_ => deleteCustomer({ variables: { key: customer.key } }).then(_ => setConfirmDelete(false))} />
            )}
        </div>
    );
};
