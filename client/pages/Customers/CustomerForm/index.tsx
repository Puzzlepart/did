import { useMutation } from '@apollo/react-hooks'
import { IconPicker, UserMessage } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import format from 'string-format'
import styles from './CreateCustomerForm.module.scss'
import CREATE_OR_UPDATE_CUSTOMER from './CREATE_OR_UPDATE_CUSTOMER'
import { ICustomerFormModel, ICustomerFormValidation } from './types'

const initialModel: ICustomerFormModel = {
    key: '',
    name: '',
    description: '',
    icon: 'Page',
}

/**
 * @category Customers
 */
export const CustomerForm = () => {
    const { t } = useTranslation(['customers', 'common'])
    const [validation, setValidation] = useState<ICustomerFormValidation>({ errors: {}, invalid: true })
    const [message, setMessage] = useState<{ text: string; type: MessageBarType }>(null)
    const [model, setModel] = useState<ICustomerFormModel>(initialModel)
    const [createOrUpdateCustomer, { loading }] = useMutation(CREATE_OR_UPDATE_CUSTOMER)

    const validateForm = (): ICustomerFormValidation => {
        const errors: { [key: string]: string } = {}
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
        const { data: { result } } = await createOrUpdateCustomer({ variables: { customer: model } })
        if (result.success) {
            setMessage({ text: format(t('createSuccess'), model.name), type: MessageBarType.success })
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error })
        }
        setModel(initialModel)
        window.setTimeout(() => setMessage(null), 5000)
    }

    return (
        <div className={styles.root}>
            {message && <UserMessage containerStyle={{ marginTop: 12, marginBottom: 12, width: 450 }} text={message.text} type={message.type} />}
            <TextField
                className={styles.inputField}
                label={t('keyLabel', { ns: 'common' })}
                description={t('keyDescription')}
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
                defaultSelectedKey={model.icon}
                options={undefined}
                onChange={(_event, opt) => setModel({ ...model, icon: opt.key as string })} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text={t('add', { ns: 'common' })}
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </div>
    )
}