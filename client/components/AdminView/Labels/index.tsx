
import { useQuery } from '@apollo/react-hooks';
import { Label } from 'components/Label';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
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
        col('name', 'Name', { maxWidth: 180 }, (label: any) => <Label {...label} />),
        col('description', 'Description'),
    ];

    if (loading) return <ProgressIndicator />;

    let commands: IContextualMenuItem[] = [
        {
            key: 'ADD_NEW_LABEL',
            name: 'Add new label',
            iconProps: { iconName: 'Add' },
        },
    ];

    return (
        <div>
            <CommandBar styles={{ root: { padding: 0 } }} items={commands} />
            <List items={value(data, 'labels', [])} columns={columns} />
        </div>
    );
}