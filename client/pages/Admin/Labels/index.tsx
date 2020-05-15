import { useMutation, useQuery } from '@apollo/react-hooks';
import { EntityLabel, List } from 'components';
import { value } from 'helpers';
import { IEntityLabel } from 'interfaces/IEntityLabel';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { generateColumn as col } from 'utils/generateColumn';
import { ILabelFormProps, LabelForm } from './LabelForm';
import { DELETE_LABEL, GET_LABELS } from './types';

/**
 * @category Admin
 */
export const Labels = () => {
    const { t } = useTranslation(['COMMON', 'LABELS']);
    const { data, refetch } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' });
    const [deleteLabel] = useMutation(DELETE_LABEL);
    const [form, setForm] = React.useState<ILabelFormProps>(null);

    const columns = [
        col(
            'name',
            t('NAME_LABEL'),
            { maxWidth: 180 },
            (label: IEntityLabel) => <EntityLabel label={label} />,
        ),
        col('description', t('DESCRIPTION_LABEL')),
        col(
            'edit_delete',
            '',
            { minWidth: 180 },
            (label: IEntityLabel) => (
                <>
                    <DefaultButton
                        styles={{ root: { marginRight: 4 } }}
                        text={t('EDIT_LABEL')}
                        onClick={() => setForm({ label })} />
                    <DefaultButton
                        text={t('DELETE_LABEL')}
                        onClick={() => {
                            deleteLabel({ variables: { id: label.id } }).then(refetch);
                        }} />
                </>
            )),
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
                            name: t('ADD_NEW_LABEL'),
                            iconProps: { iconName: 'Add' },
                            onClick: () => setForm({})
                        }
                    ],
                    farItems: []
                }} />
            {form && (
                <LabelForm
                    {...form}
                    onSave={() => {
                        refetch().then(() => setForm(null));
                    }}
                    onDismiss={() => setForm(null)} />)
            }
        </>
    );
}