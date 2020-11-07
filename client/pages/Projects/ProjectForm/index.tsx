import { useMutation } from '@apollo/client'
import { IconPicker, LabelPicker, SearchCustomer, useMessage, UserMessage } from 'components'
import { Toggle } from 'office-ui-fabric-react'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFormValidation } from 'types'
import { isBlank } from 'underscore.string'
import $createOrUpdateProject from '../createOrUpdateProject.gql'
import styles from './CreateProjectForm.module.scss'
import { IProjectFormProps, ProjectModel } from './types'

export const ProjectForm = ({ edit, onSubmitted, nameLength = [2] }: IProjectFormProps) => {
    const editMode = !!edit
    const { t } = useTranslation()
    const [validation, setValidation] = useState<IFormValidation>({ errors: {}, invalid: true })
    const [message, setMessage] = useMessage()
    const [model, setModel] = useState<ProjectModel>(new ProjectModel(edit))
    const [createOrUpdateProject, { loading }] = useMutation($createOrUpdateProject)

    /**
     * Update model
     * 
     * @param {string} key Key
     * @param {any} value Value
     */
    const updateModel = (key: string, value: any) => {
        const _model = model.clone()
        _model[key] = value
        setModel(_model)
    }

    /**
     * On validate form
     * 
     * Checks if customerKey, key and name is valid
     * 
     * @param {boolean} checkName Check name property (defaults to true)
     */
    const validateForm = (checkName = true): IFormValidation => {
        const [nameMinLength] = nameLength
        const errors: { [key: string]: string } = {}
        if (!model.customerKey) errors.customerKey = t('projects.customerFormValidationText')
        if (checkName && model.name.length < nameMinLength) errors.name = t('projects.nameFormValidationText', { nameMinLength })
        if (!(/(^[A-ZÆØÅ0-9]{2,8}$)/gm).test(model.key)) errors.key = t('projects.keyFormValidationText', { keyMinLength: 2, keyMaxLength: 8 })
        return { errors, invalid: Object.keys(errors).length > 0 }
    }

    const projectId = useMemo(() => {
        return validateForm(false).invalid
            ? ''
            : [model.customerKey, model.key].join(' ').toUpperCase()
    }, [model.customerKey, model.key])

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
                project: model,
                update: editMode,
            }
        })
        if (result.success) {
            if (editMode) {
                if (onSubmitted) setTimeout(onSubmitted, 1000)
            } else {
                setMessage({ text: t('projects.createSuccess', { projectId, name: model.name }), type: MessageBarType.success })
                setModel(new ProjectModel())
            }
        }
        else setMessage({ text: result.error?.message, type: MessageBarType.error })
    }

    return (
        <div className={styles.root}>
            {message && (
                <UserMessage
                    {...message}
                    containerStyle={{ marginTop: 12, marginBottom: 12, width: 550 }} />
            )}
            <SearchCustomer
                hidden={editMode}
                label={t('common.customer')}
                required={true}
                className={styles.inputField}
                placeholder={t('common.searchPlaceholder')}
                onClear={() => updateModel('customerKey', '')}
                errorMessage={validation.errors.customerKey}
                onSelected={value => updateModel('customerKey', value?.key)} />
            <TextField
                disabled={editMode}
                className={styles.inputField}
                label={t('projects.keyFieldLabel')}
                description={t('projects.keyFieldDescription', { keyMaxLength: 8 })}
                required={true}
                errorMessage={validation.errors.key}
                onChange={(_event, value) => updateModel('key', value.toUpperCase())}
                value={model.key} />
            <UserMessage
                hidden={editMode}
                className={styles.idPreviewText}
                iconName='OutlookLogo'
                text={isBlank(projectId)
                    ? t('projects.idPreviewBlankText')
                    : t('projects.idPreviewText', { projectId })} />
            <div className={styles.inputField} hidden={editMode}>
                <Toggle
                    label={t('projects.createOutlookCategoryFieldLabel')}
                    checked={model.createOutlookCategory}
                    onChanged={value => updateModel('createOutlookCategory', value)} />
                <span className={styles.inputDescription}>{t('projects.createOutlookCategoryFieldDescription', { id: projectId })}</span>
            </div>
            <TextField
                className={styles.inputField}
                label={t('common.nameFieldLabel')}
                description={t('projects.nameFieldDescription')}
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, value) => updateModel('name', value)}
                value={model.name} />
            <TextField
                className={styles.inputField}
                label={t('common.descriptionFieldLabel')}
                description={t('projects.descriptionFieldDescription')}
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, value) => updateModel('description', value)}
                value={model.description} />
            <IconPicker
                className={styles.inputField}
                defaultSelected={model.icon}
                label={t('common.iconLabel')}
                placeholder={t('common.iconSearchPlaceholder')}
                width={300}
                onSelected={value => updateModel('icon', value)} />
            <div className={styles.inputField} hidden={!editMode}>
                <Toggle
                    label={t('common.inactiveFieldLabel')}
                    checked={model.inactive}
                    onChanged={value => updateModel('inactive', value)} />
                <span className={styles.inputDescription}>{t('projects.inactiveFieldDescription')}</span>
            </div>
            <LabelPicker
                className={styles.inputField}
                label={t('admin.labels')}
                searchLabelText={t('admin.filterLabels')}
                defaultSelectedKeys={editMode ? edit.labels.map(lbl => lbl.name) : []}
                onChange={labels => updateModel('labels', labels.map(lbl => lbl.name))} />
            <PrimaryButton
                className={styles.inputField}
                text={editMode ? t('common.save') : t('common.add')}
                onClick={onFormSubmit}
                disabled={loading || !!message} />

        </div>
    )
}