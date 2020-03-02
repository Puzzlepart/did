
import { useQuery } from '@apollo/react-hooks';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import * as React from 'react';
import GET_USERS from './GET_USERS';
import { USER_LIST_COLUMNS } from './USER_LIST_COLUMNS';

/**
 * @component Users
 * @description
 */
export const Users = () => {
    const { data, loading } = useQuery(GET_USERS);

    return (
        <List
            enableShimmer={loading}
            items={value(data, 'users', [])}
            columns={USER_LIST_COLUMNS} />
    );
}