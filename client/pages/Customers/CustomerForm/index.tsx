import { Panel, PrimaryButton, TextField } from '@fluentui/react'
import { ConditionalWrapper, IconPicker, Toast } from 'components'
import { config } from 'package'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CustomerForm.module.scss'
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'

export const CustomerForm: React.FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, submit } = useCustomerForm(props)
  return (
    <ConditionalWrapper
      condition={!!props.panel}
      wrapper={(children) => <Panel {...props.panel}>{children}</Panel>}>
      <div className={styles.root}>
        <Toast {...submit.toast} />
        <TextField
          className={styles.inputField}
          disabled={!!props.edit}
          label={t('customers.keyFieldLabel')}
          description={t('customers.keyFieldDescription', config.app)}
          required={true}
          onChange={(_event, value) => model.set('key', value.toUpperCase())}
          value={model.value('key')}
        />
        <TextField
          className={styles.inputField}
          label={t('common.nameFieldLabel')}
          description={t('customers.nameFieldDescription', config.app)}
          required={true}
          onChange={(_event, value) => model.set('name', value)}
          value={model.value('name')}
        />
        <TextField
          className={styles.inputField}
          label={t('common.descriptionFieldLabel')}
          description={t('customers.descriptionFieldDescription')}
          multiline={true}
          autoAdjustHeight={true}
          onChange={(_event, value) => model.set('description', value)}
          value={model.value('description')}
        />
        <IconPicker
          className={styles.inputField}
          defaultSelected={model.value('icon')}
          label={t('common.iconFieldLabel')}
          description={t('customers.iconFieldDescription')}
          placeholder={t('common.iconSearchPlaceholder')}
          width={300}
          onSelected={(value) => model.set('icon', value)}
          required={true}
        />
        <PrimaryButton
          className={styles.inputField}
          text={!!props.edit ? t('common.save') : t('common.add')}
          onClick={submit.onClick}
          disabled={submit.disabled}
        />
      </div>
    </ConditionalWrapper>
  )
}
