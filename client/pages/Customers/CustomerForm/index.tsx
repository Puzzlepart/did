import { useMutation } from '@apollo/react-hooks'
import { getIcons } from 'common/icons'
import { IconPicker, UserMessage } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { first, pick } from 'underscore'
import styles from './CreateCustomerForm.module.scss'
import CREATE_OR_UPDATE_CUSTOMER, { ICreateOrUpdateCustomerVariables, ICustomerInput } from './CREATE_OR_UPDATE_CUSTOMER'
import { ICustomerFormValidation } from './types'

const initialModel: ICustomerInput = {
    key: '',
    name: '',
    description: '',
    icon: first(getIcons(1)),
}

/**
 * @category Customers
 */
export const CustomerForm = () => {
    const { t } = useTranslation()
    const [validation, setValidation] = useState<ICustomerFormValidation>({ errors: {}, invalid: true })
    const [message, setMessage] = useState<{ text: string; type: MessageBarType }>(null)
    const [model, setModel] = useState<ICustomerInput>(initialModel)
    const [createOrUpdateCustomer, { loading }] = useMutation<any, ICreateOrUpdateCustomerVariables>(CREATE_OR_UPDATE_CUSTOMER)

    /**
     * On validate form
     */
    const validateForm = (): ICustomerFormValidation => {
        const errors: { [key: string]: string } = {}
        if (model.name.length < 2) errors.name = format(t('customers.nameFormValidationText'), 2)
        if (!(/(^[A-ZÆØÅ0-9]{3,8}$)/gm).test(model.key)) errors.key = format(t('customers.keyFormValidationText'), 3, 8)
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
        const { data: { result } } = await createOrUpdateCustomer({
            variables: {
                customer: pick(model, ...Object.keys(initialModel) as any) as ICustomerInput,
                update: false,
            }
        })
        if (result.success) {
            setMessage({ text: format(t('customers.createSuccess'), model.name), type: MessageBarType.success })
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
                label={t('common.keyFieldLabel')}
                description={t('customers.keyFieldDescription')}
                required={true}
                errorMessage={validation.errors.key}
                onChange={(_event, key) => setModel({ ...model, key })}
                value={model.key} />
            <TextField
                className={styles.inputField}
                label={t('common.nameFieldLabel')}
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                className={styles.inputField}
                label={t('common.descriptionFieldLabel')}
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <IconPicker
                className={styles.inputField}
                defaultSelected={model.icon}
                label={t('common.iconLabel')}
                placeholder={t('common.iconSearchPlaceholder')}
                width={300}
                onSelected={icon => setModel({ ...model, icon })} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text={t('common.add')}
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </div>
    )
}