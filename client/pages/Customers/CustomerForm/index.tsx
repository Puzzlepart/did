import { ConditionalWrapper, IconPicker, Toast } from 'components'
import { Panel, PrimaryButton, TextField } from 'office-ui-fabric-react'
import { config } from 'package'
import React from 'react'
import styles from './CustomerForm.module.scss'
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'

export const CustomerForm: React.FC<ICustomerFormProps> = (props) => {
  const { loading, state, dispatch, toast, onFormSubmit, t } = useCustomerForm({
    props
  })

  return (
    <ConditionalWrapper
      condition={!!props.panel}
      wrapper={(children) => <Panel {...props.panel}>{children}</Panel>}>
      <div className={styles.root}>
        <Toast {...toast} />
        <TextField
          className={styles.inputField}
          disabled={state.editMode}
          label={t('customers.keyFieldLabel')}
          description={t('customers.keyFieldDescription', config.app)}
          required={true}
          errorMessage={state.validation.errors.key}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',

              payload: ['key', value.toUpperCase()]
            })
          }
          value={state.model.key}
        />
        <TextField
          className={styles.inputField}
          label={t('common.nameFieldLabel')}
          description={t('customers.nameFieldDescription', config.app)}
          required={true}
          errorMessage={state.validation.errors.name}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['name', value]
            })
          }
          value={state.model.name}
        />
        <TextField
          className={styles.inputField}
          label={t('common.descriptionFieldLabel')}
          description={t('customers.descriptionFieldDescription')}
          multiline={true}
          autoAdjustHeight={true}
          errorMessage={state.validation.errors.description}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['description', value]
            })
          }
          value={state.model.description}
        />
        <IconPicker
          className={styles.inputField}
          defaultSelected={state.model.icon}
          label={t('common.iconFieldLabel')}
          description={t('customers.iconFieldDescription')}
          placeholder={t('common.iconSearchPlaceholder')}
          width={300}
          onSelected={(value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['icon', value]
            })
          }
        />
        <PrimaryButton
          className={styles.inputField}
          text={state.editMode ? t('common.save') : t('common.add')}
          onClick={onFormSubmit}
          disabled={loading || !toast.hidden}
        />
      </div>
    </ConditionalWrapper>
  )
}
