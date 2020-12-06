import { useMutation } from '@apollo/client'
import { IconPicker, UserMessage } from 'components'
import { MessageBarType, PrimaryButton, TextField } from 'office-ui-fabric'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFormValidation } from 'types/IFormValidation'
import styles from './CustomerForm.module.scss'
import $createOrUpdateCustomer from './createOrUpdateCustomer.gql'
import { CustomerModel } from './types'
import { validateForm } from './validateForm'
import AppConfig from 'AppConfig'

export const CustomerForm: FunctionComponent = () => {
  const { t } = useTranslation()
  const [validation, setValidation] = useState<IFormValidation>({ errors: {}, invalid: true })
  const [message, setMessage] = useState<{ text: string; type: MessageBarType }>(null)
  const [model, setModel] = useState<CustomerModel>(new CustomerModel())
  const [createOrUpdateCustomer, { loading }] = useMutation($createOrUpdateCustomer)

  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm(model, t)
    if (_validation.invalid) {
      setValidation(_validation)
      return
    }
    setValidation({ errors: {}, invalid: false })
    const {
      data: { result }
    } = await createOrUpdateCustomer({
      variables: {
        customer: model,
        update: false
      }
    })
    if (result.success) {
      setMessage({
        text: t('customers.createSuccess', { name: model.name }),
        type: MessageBarType.success
      })
    } else {
      setMessage({ text: result.error.message, type: MessageBarType.error })
    }
    setModel(new CustomerModel())
    window.setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div className={styles.root}>
      {message && (
        <UserMessage
          containerStyle={{ marginTop: 12, marginBottom: 12, width: 550 }}
          text={message.text}
          type={message.type}
        />
      )}
      <TextField
        className={styles.inputField}
        label={t('customers.keyFieldLabel')}
        description={t('customers.keyFieldDescription', AppConfig)}
        required={true}
        errorMessage={validation.errors.key}
        onChange={(_event, key) => setModel({ ...model, key })}
        value={model.key}
      />
      <TextField
        className={styles.inputField}
        label={t('common.nameFieldLabel')}
        description={t('customers.nameFieldDescription', AppConfig)}
        required={true}
        errorMessage={validation.errors.name}
        onChange={(_event, name) => setModel({ ...model, name })}
        value={model.name}
      />
      <TextField
        className={styles.inputField}
        label={t('common.descriptionFieldLabel')}
        multiline={true}
        errorMessage={validation.errors.description}
        onChange={(_event, description) => setModel({ ...model, description })}
        value={model.description}
      />
      <IconPicker
        className={styles.inputField}
        defaultSelected={model.icon}
        label={t('common.iconFieldLabel')}
        description={t('customers.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        onSelected={(icon) => setModel({ ...model, icon })}
      />
      <PrimaryButton
        styles={{ root: { marginTop: 16 } }}
        text={t('common.add')}
        iconProps={{ iconName: 'CirclePlus' }}
        onClick={onFormSubmit}
        disabled={loading || !!message}
      />
    </div>
  )
}
