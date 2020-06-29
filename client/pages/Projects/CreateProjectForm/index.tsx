import { useMutation } from '@apollo/react-hooks'
import { IconPicker, SearchCustomer, useMessage, UserMessage, LabelPicker } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import format from 'string-format'
import styles from './CreateProjectForm.module.scss'
import CREATE_PROJECT from './CREATE_PROJECT'
import { ICreateProjectFormModel } from './ICreateProjectFormModel'
import { ICreateProjectFormValidation } from './ICreateProjectFormValidation'

const initialModel: ICreateProjectFormModel = {
    key: '',
    name: '',
    customerKey: '',
    description: '',
    icon: 'Page',
}

/**
 * @category Projects
 */
export const CreateProjectForm = () => {
    const { t } = useTranslation(['projects', 'common'])
    const [validation, setValidation] = useState<ICreateProjectFormValidation>({ errors: {}, invalid: true })
    const [message, setMessage] = useMessage()
    const [model, setModel] = useState<ICreateProjectFormModel>(initialModel)
    const [addProject, { loading }] = useMutation<any, { project: ICreateProjectFormModel }>(CREATE_PROJECT)

    const validateForm = (): ICreateProjectFormValidation => {
        const errors: { [key: string]: string } = {}
        if (!model.customerKey) errors.customerKey = ''
        if (model.name.length < 2) errors.name = t('nameFormValidationText')
        if (!(/(^[A-ZÆØÅ0-9]{3,8}$)/gm).test(model.key)) errors.key = t('keyFormValidationText')
        return { errors, invalid: Object.keys(errors).length > 0 }
    }

    const onFormSubmit = async () => {
        const _validation = validateForm()
        if (_validation.invalid) {
            setValidation(_validation)
            return
        }
        setValidation({ errors: {}, invalid: false })
        const { data: { result } } = await addProject({ variables: { project: model } })
        if (result.success) {
            setMessage({ text: format(t('createSuccess'), model.name), type: MessageBarType.success })
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error })
        }
        setModel(initialModel)
    }

    return (
        <div className={styles.root}>
            {message && <UserMessage {...message} containerStyle={{ marginTop: 12, marginBottom: 12, width: 450 }} />}
            <Label>{t('customer', { ns: 'common' })}</Label>
            <SearchCustomer
                required={true}
                className={styles.inputField}
                placeholder={t('searchPlaceholder')}
                onSelected={customer => setModel({
                    ...model,
                    customerKey: customer && customer.key,
                })} />
            <TextField
                className={styles.inputField}
                label={t('keyLabel', { ns: 'common' })}
                description={t('keyDescription')}
                title={t('keyDescription')}
                required={true}
                errorMessage={validation.errors.key}
                onChange={(_event, key) => setModel({ ...model, key })}
                value={model.key} />
            <TextField
                className={styles.inputField}
                label={t('nameLabel', { ns: 'common' })}
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                className={styles.inputField}
                label={t('descriptionLabel', { ns: 'common' })}
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <IconPicker
                className={styles.iconPicker}
                options={undefined}
                defaultSelectedKey={initialModel.icon}
                onChange={(_event, opt) => setModel({ ...model, icon: opt.key as string })} />
            <LabelPicker />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text={t('add', { ns: 'common' })}
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </div>
    )
}