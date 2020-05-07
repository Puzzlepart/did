import { useQuery } from '@apollo/react-hooks';
import { UserMessage } from 'common/components/UserMessage';
import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { IProject } from 'interfaces/IProject';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { GET_PROJECTS, ProjectList } from 'pages/Projects';
import * as React from 'react';
import styles from './CustomerDetails.module.scss';
import { ICustomerDetailsProps } from './ICustomerDetailsProps';


/**
 * @category Customers
 */
export const CustomerDetails = (props: ICustomerDetailsProps) => {
    const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { customerKey: value<string>(props, 'customer.key', '') } });

    return (
        <div className={styles.root}>
            <h3 className={styles.name}>{props.customer.name}</h3>
            {props.customer.inactive && (
                <UserMessage
                    text={resource('CUSTOMERS.CUSTOMER_INACTIVE_TEXT')}
                    iconName='Warning'
                    type={MessageBarType.warning} />
            )}
            <div className={styles.description}>{props.customer.description}</div>
            <div className={styles.actions}>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || !props.customer.webLink}>
                    <DefaultButton
                        text={resource('CUSTOMERS.CUSTOMER_WEBLINK_TEXT')}
                        href={props.customer.webLink}
                        iconProps={{ iconName: 'WorkforceManagement' }} />
                </div>

                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || !props.customer.externalSystemURL} >
                    <DefaultButton
                        text={resource('CUSTOMERS.CUSTOMER_EXTERNAL_SYSTEM_URL_TEXT')}
                        href={props.customer.externalSystemURL}
                        iconProps={{ iconName: 'WorkforceManagement' }} />
                </div>
            </div>
            <div>
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
    );
};
