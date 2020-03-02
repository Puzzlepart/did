
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EntityLabel } from 'components/EntityLabel';
import { List } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from 'office-ui-fabric-react/lib/Link';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import DELETE_LABEL from './DELETE_LABEL';
import GET_LABELS from './GET_LABELS';
import { ILabelFormModalProps, LabelFormModal } from './LabelFormModal';
import { ILabel } from 'interfaces';

/**
 * @component Labels
 * @description Renders a list of labels with add, edit and delete functionality
 */
export const Labels = () => {
    const [form, setForm] = React.useState<ILabelFormModalProps>(null);
    const { data, loading, refetch } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' });
    let [deleteLabel] = useMutation(DELETE_LABEL);
    const columns = [
        col('name', 'Name', { maxWidth: 180 }, (label: ILabel) => <EntityLabel {...label} />),
        col('description', 'Description', { maxWidth: 220 }),
        col('actions', '', {}, (label: ILabel) => (
            <>
                <Link onClick={_ => deleteLabel({ variables: { id: label.id } }).then(refetch)}>Delete</Link>
                <Link style={{ marginLeft: 4 }} onClick={_ => setForm({ label })}>Edit</Link>
            </>
        ))
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