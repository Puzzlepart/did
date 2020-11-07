import { useMutation, useQuery } from '@apollo/client'
import { List } from 'components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { LabelColumns as columns } from './columns'
import DELETE_LABEL from './DELETE_LABEL'
import GET_LABELS from './GET_LABELS'
import { ILabelFormProps, LabelForm } from './LabelForm'

export const Labels = () => {
    const { t } = useTranslation()
    const { data, refetch } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' })
    const [deleteLabel] = useMutation(DELETE_LABEL)
    const [form, setForm] = useState<ILabelFormProps>(null)

    const onEdit = (label: LabelObject) => setForm({ label })

    const onDelete = (label: LabelObject) => deleteLabel({ variables: { name: label.name } }).then(refetch)

    useEffect(() => { refetch() }, [form])

    return (
        <>
            <List
                items={data?.labels || []}
                columns={columns(onEdit,onDelete, t)}
                commandBar={{
                    items: [
                        {
                            key: 'ADD_NEW_LABEL',
                            name: t('admin.addNewLabel'),
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