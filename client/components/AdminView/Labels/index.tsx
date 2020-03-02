
import { useQuery } from '@apollo/react-hooks';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import GET_LABELS from './GET_LABELS';

/**
 * @component Labels
 * @description
 */
export const Labels = () => {
    const { data, loading } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' });
    const columns = [
        col('name', 'Name', { maxWidth: 180 }, (label: any) => <div className='label' style={{ backgroundColor: label.color }}>{label.name}</div>),
        col('description', 'Description'),
    ];

    if (loading) return <ProgressIndicator />;

    return (
        <div className='c-AdminView-labels'>
            <List items={value(data, 'labels', [])} columns={columns} />
        </div>
    );
}