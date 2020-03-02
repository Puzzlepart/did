
import { useQuery } from '@apollo/react-hooks';
import { EntityLabel } from 'components/EntityLabel';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import GET_LABELS from './GET_LABELS';
import { LabelFormModal, ILabelFormModalProps } from './LabelFormModal';

/**
 * @component Labels
 * @description
 */
export const Labels = () => {
    const [form, setForm] = React.useState<ILabelFormModalProps>(null);
    const { data, loading, refetch } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' });
    const columns = [
        col('name', 'Name', { maxWidth: 180 }, (label: any) => <EntityLabel {...label} />),
        col('description', 'Description'),
    ];

    if (loading) return <ProgressIndicator />;

    let commands: IContextualMenuItem[] = [
        {
            key: 'ADD_NEW_LABEL',
            name: 'Add new label',
            iconProps: { iconName: 'Add' },
            onClick: () => setForm({ title: 'Add new label' }),
        },
    ];

    return (
        <div>
            <CommandBar styles={{ root: { padding: 0 } }} items={commands} />
            <List items={value(data, 'labels', [])} columns={columns} />
            {form && (
                <LabelFormModal
                    {...form}
                    modal={{
                        onDismiss: event => {
                            setForm(null);
                            !event && refetch();
                        }
                    }} />)}
        </div>
    );
}