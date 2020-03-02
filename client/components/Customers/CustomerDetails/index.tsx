import { useQuery } from '@apollo/react-hooks';
import { Label } from 'components/Label';
import { GET_PROJECTS } from 'components/Projects/GET_PROJECTS';
import { ProjectList } from 'components/Projects/ProjectList';
import { getValueTyped as value } from 'helpers';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { CustomerDetailsProps } from './CustomerDetailsProps';

/**
 * @component CustomerDetails
 * @description 
 */
export const CustomerDetails = ({ customer }: CustomerDetailsProps) => {
    const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { customerKey: value<string>(customer, 'key', '') } });

    const projects = value<any[]>(data, 'projects', []);

    return (
        <div className='c-CustomerDetails'>
            <div className='container'>
                <div className="row">
                    <div className="col-sm">
                        <h3>{customer.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <p>{customer.description}</p>
                    </div>
                </div>
                <div className="row c-CustomerDetails-labels">
                    <div className="col-sm">
                        {customer.labels.map(label => <Label {...label} />)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <DefaultButton
                            hidden={!customer.webLink}
                            text='Customer workspace'
                            onClick={() => window.location.replace(customer.webLink)}
                            iconProps={{ iconName: 'WorkforceManagement' }}
                            disabled={loading || !!error || !customer.webLink} />
                    </div>
                </div>
            </div>
            {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
            {!error && (
                <ProjectList
                    items={projects}
                    enableShimmer={loading}
                    searchBox={{ placeholder: `Search in projects...` }}
                    renderLink={true}
                    height={300} />
            )}
        </div>
    );
};
