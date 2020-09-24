import { useMutation, useQuery } from '@apollo/react-hooks'
import { EntityLabel, List } from 'components'
import { IEntityLabel } from 'interfaces/IEntityLabel'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import DELETE_LABEL from './DELETE_LABEL'
import GET_LABELS from './GET_LABELS'
import { ILabelFormProps, LabelForm } from './LabelForm'

/**
 * @category Admin
 */
export const Labels = () => {
    const { t } = useTranslation()
    const { data, refetch } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' })
    const [deleteLabel] = useMutation(DELETE_LABEL)
    const [form, setForm] = useState<ILabelFormProps>(null)

    const columns = [
        col(
            'name',
            t('common.nameFieldLabel'),
            { maxWidth: 180 },
            (label: IEntityLabel) => <EntityLabel label={label} />,
        ),
        col('description', t('common.descriptionFieldLabel')),
        col(
            'edit_delete',
            '',
            { minWidth: 180 },
            (label: IEntityLabel) => (
                <>
                    <DefaultButton
                        styles={{ root: { marginRight: 4 } }}
                        text={t('common.editLabel')}
                        onClick={() => setForm({ label })} />
                    <DefaultButton
                        text={t('common.delete')}
                        onClick={() => deleteLabel({ variables: { name: label.name } }).then(refetch)} />
                </>
            )),
    ]

    useEffect(() => { refetch() }, [form])

    return (
        <>
            <List
                items={data?.labels || []}
                columns={columns}
                commandBar={{
                    items: [
                        {
                            key: 'NEW_LABEL',
                            name: t('common.addNewLabel'),
                            iconProps: { iconName: 'Add' },
                            onClick: () => setForm({})
                        }
                    ],
                    farItems: []
                }} />
            {form && (
                <LabelForm
                    {...form}
                    onSave={() => refetch().then(() => setForm(null))}
                    onDismiss={() => setForm(null)} />)
            }
        </>
    )
}