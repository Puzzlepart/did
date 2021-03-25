import { useMutation } from '@apollo/client'
import { useToast } from 'components/Toast'
import { MessageBarType } from '@fluentui/react-react'
import { useContext, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import $createOrUpdateCustomer from './createOrUpdateCustomer.gql'
import reducer, { initState } from './reducer'
import { validateForm } from './validateForm'

export function useCustomerForm({ props }) {
  const { t } = useTranslation()
  const context = useContext(CustomersContext)
  const [toast, setToast] = useToast(8000, {
    isMultiline: true
  })
  const [state, dispatch] = useReducer(reducer, initState(props.edit))
  const [createOrUpdateCustomer, { loading }] = useMutation(
    $createOrUpdateCustomer
  )

  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm(state.model, t)
    if (_validation.invalid) {
      dispatch({ type: 'SET_VALIDATION', payload: { validation: _validation } })
      return
    }
    try {
      await createOrUpdateCustomer({
        variables: {
          customer: state.model,
          update: state.editMode
        }
      })
      if (props.panel) setTimeout(props.panel.onSave, 1000)
      else {
        setToast({
          text: t('customers.createSuccess', { name: state.model.name }),
          type: MessageBarType.success
        })
        dispatch({ type: 'RESET_FORM' })
        context.refetch()
      }
    } catch {
      setToast({
        text: t('customers.createError'),
        type: MessageBarType.error
      })
    }
  }

  return {
    loading,
    state,
    dispatch,
    toast,
    onFormSubmit,
    t
  }
}
