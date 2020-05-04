import { useQuery } from '@apollo/react-hooks';
import { UserMessage } from 'common/components/UserMessage';
import { GET_PROJECTS, ProjectList } from 'pages/Projects';
import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { IProject } from 'interfaces/IProject';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { ICustomerDetailsProps } from './ICustomerDetailsProps';

/**
 * @category Customers
 */
export const CustomerDetails = (props: ICustomerDetailsProps) => {
    const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { customerKey: value<string>(props, 'customer.key', '') } });

    return (
        <div className='c-CustomerDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm'>
                        <h3>{props.customer.name}</h3>
                    </div>
                </div>
                {props.customer.inactive && (
                    <div className='row' style={{ marginBottom: 10 }}>
                        <div className='col-sm'>
                            <UserMessage text={resource('CUSTOMERS.CUSTOMER_INACTIVE_TEXT')} iconName='Warning' type={MessageBarType.warning} />
                        </div>
                    </div>
                )}
                <div className='row'>
                    <div className='col-sm'>
                        <p>{props.customer.description}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <Link href={props.customer.webLink}>{props.customer.webLink}</Link>
                    </div>
                </div>
                <div className='row' style={{ marginTop: 20 }}>
                    <div className='col-sm'>
                        {error && <MessageBar messageBarType={MessageBarType.error}>{resource('COMMON.GENERIC_ERROR_TEXT')}</MessageBar>}
                        {!error && (
                            <ProjectList
                                items={value<IProject[]>(data, 'projects', [])}
                                enableShimmer={loading}
                                searchBox={{ placeholder: resource('PROJECTS.SEARCH_PLACEHOLDER') }}
                                renderLink={true}
                                height={300} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
