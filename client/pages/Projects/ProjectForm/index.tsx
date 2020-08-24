import { useMutation } from '@apollo/react-hooks'
import { IconPicker, LabelPicker, SearchCustomer, useMessage, UserMessage } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import format from 'string-format'
import { pick } from 'underscore'
import styles from './CreateProjectForm.module.scss'
import CREATE_PROJECT from './CREATE_PROJECT'
import { IProjectFormProps, IProjectFormValidation } from './types'

const initialModel = {
    key: '',
    name: '',
    customerKey: '',
    description: '',
    icon: 'Page',
    labels: [],
}

/**
 * @category Projects
 */
export const ProjectForm = ({ edit, onSubmitted }: IProjectFormProps) => {
    const isEdit = !!edit
    const { t } = useTranslation(['projects', 'common'])
    const [validation, setValidation] = useState<IProjectFormValidation>({ errors: {}, invalid: true })
    const [message, setMessage] = useMessage()
    const [model, setModel] = useState<any>(edit ? { ...edit, labels: edit.labels.map(lbl => lbl.id) } : initialModel)
    const [addProject, { loading }] = useMutation<any, { project: any }>(CREATE_PROJECT)

    const validateForm = (): IProjectFormValidation => {
        const errors: { [key: string]: string } = {}
        if (!model.customerKey) errors.customerKey = ''
        if (model.name.length < 2) errors.name = t('nameFormValidationText')
        if (!(/(^[A-ZÆØÅ0-9]{2,8}$)/gm).test(model.key)) errors.key = t('keyFormValidationText')
        return { errors, invalid: Object.keys(errors).length > 0 }
    }

    const onFormSubmit = async () => {
        const _validation = validateForm()
        if (_validation.invalid) {
            setValidation(_validation)
            return
        }
        setValidation({ errors: {}, invalid: false })
        const { data: { result } } = await addProject({ variables: { project: pick(model, ...Object.keys(initialModel)) } })
        if (result.success) setMessage({ text: format(t('createSuccess'), model.name), type: MessageBarType.success })
        else setMessage({ text: result.error.message, type: MessageBarType.error })
        setModel(initialModel)
        onSubmitted()
    }

    return (
        <div className={styles.root}>
            {message && (
                <UserMessage
                    {...message}
                    containerStyle={{ marginTop: 12, marginBottom: 12, width: 450 }} />
            )}
            <SearchCustomer
                hidden={isEdit}
                label={t('customer', { ns: 'common' })}
                required={true}
                className={styles.inputElement}
                placeholder={t('searchPlaceholder')}
                onSelected={customer => setModel({
                    ...model,
                    customerKey: customer && customer.key,
                })} />
            <TextField
                disabled={isEdit}
                className={styles.inputElement}
                label={t('keyLabel', { ns: 'common' })}
                description={t('keyDescription')}
                title={t('keyDescription')}
                required={true}
                errorMessage={validation.errors.key}
                onChange={(_event, key) => setModel({ ...model, key })}
                value={model.key} />
            <TextField
                className={styles.inputElement}
                label={t('nameLabel', { ns: 'common' })}
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                className={styles.inputElement}
                label={t('descriptionLabel', { ns: 'common' })}
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <IconPicker
                className={styles.iconPicker}
                options={undefined}
                defaultSelectedKey={model.icon}
                onChange={(_event, opt) => setModel({ ...model, icon: opt.key as string })} />
            <LabelPicker
                className={styles.inputElement}
                label={t('labels', { ns: 'admin' })}
                searchLabelText={t('filterLabels', { ns: 'admin' })}
                defaultSelectedKeys={edit ? edit.labels.map(lbl => lbl.id) : []}
                onChange={labels => setModel({ ...model, labels: labels.map(lbl => lbl.id) })} />
            <PrimaryButton
                className={styles.inputElement}
                text={t(isEdit ? 'save' : 'add', { ns: 'common' })}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </div>
    )
}