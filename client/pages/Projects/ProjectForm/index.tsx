import { useMutation } from '@apollo/react-hooks'
import { IconPicker, LabelPicker, SearchCustomer, useMessage, UserMessage } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import { pick } from 'underscore'
import styles from './CreateProjectForm.module.scss'
import CREATE_OR_UPDATE_PROJECT, { ICreateOrUpdateProjectVariables, IProjectInput } from './CREATE_OR_UPDATE_PROJECT'
import { IProjectFormProps, IProjectFormValidation } from './types'

const initialModel: IProjectInput = {
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
export const ProjectForm = (props: IProjectFormProps) => {
    const isEdit = !!props.edit
    const { t } = useTranslation(['projects', 'common'])
    const [validation, setValidation] = useState<IProjectFormValidation>({ errors: {}, invalid: true })
    const [message, setMessage] = useMessage()
    const [model, setModel] = useState<IProjectInput>(props.edit
        ? { ...props.edit, labels: props.edit.labels.map(lbl => lbl.name) }
        : initialModel
    )
    const [createOrUpdateProject, { loading }] = useMutation<any, ICreateOrUpdateProjectVariables>(CREATE_OR_UPDATE_PROJECT)

    /**
     * On validate form
     */
    const validateForm = (): IProjectFormValidation => {
        const errors: { [key: string]: string } = {}
        if (!model.customerKey) errors.customerKey = ''
        if (model.name.length < 2) errors.name = t('nameFormValidationText')
        if (!(/(^[A-ZÆØÅ0-9]{2,8}$)/gm).test(model.key)) errors.key = t('keyFormValidationText')
        return { errors, invalid: Object.keys(errors).length > 0 }
    }

    /**
     * On form submit
     */
    const onFormSubmit = async () => {
        const _validation = validateForm()
        if (_validation.invalid) {
            setValidation(_validation)
            return
        }
        setValidation({ errors: {}, invalid: false })
        const { data: { result } } = await createOrUpdateProject({
            variables: {
                project: pick(model, ...Object.keys(initialModel) as any) as IProjectInput,
                update: isEdit,
            }
        })
        if (result.success) setMessage({ text: format(t('createSuccess'), model.name), type: MessageBarType.success })
        else setMessage({ text: result.error.message, type: MessageBarType.error })
        setModel(initialModel)
        props.onSubmitted && props.onSubmitted()
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
                label={t('iconLabel', { ns: 'common' })}
                placeholder={t('iconSearchPlaceholder', { ns: 'common' })}
                width={300}
                onSelected={icon => setModel({ ...model, icon})} />
            <LabelPicker
                className={styles.inputElement}
                label={t('labels', { ns: 'admin' })}
                searchLabelText={t('filterLabels', { ns: 'admin' })}
                defaultSelectedKeys={props.edit ? props.edit.labels.map(lbl => lbl.name) : []}
                onChange={labels => setModel({ ...model, labels: labels.map(lbl => lbl.name) })} />
            <PrimaryButton
                className={styles.inputElement}
                text={t(isEdit ? 'save' : 'add', { ns: 'common' })}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </div>
    )
}