import { useQuery } from '@apollo/react-hooks';
import { GET_PROJECTS } from 'components/Projects/GET_PROJECTS';
import { ProjectList } from 'components/Projects/ProjectList';
import { getValueTyped as value } from 'helpers';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';

export const CustomerDetails = ({ customer }) => {
    const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { customerKey: value<string>(customer, 'key', '') } });

    const projects = value<any[]>(data, 'projects', []);

    return (
        <div>
            <div>
                <h3>{customer.name}</h3>
                <p hidden={!customer.description}>{customer.description}</p>
                <p hidden={!customer.webLink}><a href={customer.webLink}>{customer.webLink}</a></p>
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
