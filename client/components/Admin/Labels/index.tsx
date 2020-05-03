import { useQuery } from '@apollo/react-hooks';
import { EntityLabel } from 'common/components/EntityLabel';
import List from 'common/components/List';
import { getValueTyped as value } from 'helpers';
import { ILabel } from 'interfaces';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import GET_LABELS from './GET_LABELS';
import { ILabelFormModalProps, LabelFormModal } from './LabelFormModal';

/**
 * @category Admin
 */
export const Labels = () => {
    const { data, loading, refetch } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' });

    const [form, setForm] = React.useState<ILabelFormModalProps>(null);

    const columns = [
        col(
            'name',
            'Name',
            { maxWidth: 180 },
            (label: ILabel) => <EntityLabel {...label} />,
        ),
        col(
            'description',
            'Description',
            { maxWidth: 220 },
        ),
    ];

    React.useEffect(() => { refetch() }, [form]);

    return (
        <>
            <List
                items={value(data, 'labels', [])}
                columns={columns}
                commandBar={{
                    items: [
                        {
                            key: 'NEW_LABEL',
                            name: 'New label',
                            iconProps: { iconName: 'Add' },
                            onClick: () => setForm({})
                        }
                    ],
                    farItems: []
                }} />
            {form && <LabelFormModal {...form} onDismiss={() => setForm(null)} />}
        </>
    );
}