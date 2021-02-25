import { useMutation } from '@apollo/client'
import AppConfig from 'AppConfig'
import { IconPicker, useMessage, UserMessage } from 'components'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { MessageBarType, Panel, PrimaryButton, TextField } from 'office-ui-fabric'
import React, { FunctionComponent, useContext, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import $createOrUpdateCustomer from './createOrUpdateCustomer.gql'
import styles from './CustomerForm.module.scss'
import reducer, { initState } from './reducer'
import { ICustomerFormProps } from './types'
import { validateForm } from './validateForm'

export const CustomerForm: FunctionComponent<ICustomerFormProps> = (props: ICustomerFormProps) => {
  const { t } = useTranslation()
  const context = useContext(CustomersContext)
  const [message, setMessage] = useMessage()
  const [state, dispatch] = useReducer(reducer, initState(props.edit))
  const [createOrUpdateCustomer, { loading }] = useMutation($createOrUpdateCustomer)

  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm(state.model, t)
    if (_validation.invalid) {
      dispatch({ type: 'SET_VALIDATION', payload: { validation: _validation } })
      return
    }
    const { data } = await createOrUpdateCustomer({
      variables: {
        customer: state.model,
        update: state.editMode
      }
    })
    if (data?.result.success) {
      if (props.panel) setTimeout(props.panel.onSave, 1000)
      else {
        setMessage({
          text: t('customers.createSuccess', { name: state.model.name }),
          type: MessageBarType.success
        })
        dispatch({ type: 'RESET_FORM' })
        context.refetch()
      }
    } else {
      setMessage({ text: data?.result.error?.message, type: MessageBarType.error })
    }
  }

  return (
    <ConditionalWrapper
      condition={!!props.panel}
      wrapper={(children) => <Panel {...props.panel}>{children}</Panel>}>
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
          disabled={state.editMode}
          label={t('customers.keyFieldLabel')}
          description={t('customers.keyFieldDescription', AppConfig)}
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
          description={t('customers.nameFieldDescription', AppConfig)}
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
          disabled={loading || !!message}
        />
      </div>
    </ConditionalWrapper>
  )
}
