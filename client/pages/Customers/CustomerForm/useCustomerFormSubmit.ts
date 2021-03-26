import { useMutation } from '@apollo/client'
import { useToast } from 'components/Toast'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import $create_or_update_customer from './create-or-update-customer.gql'
import { ICustomerFormProps } from './types'
import { useCustomerModel } from './useCustomerModel'

/**
 * Customer form submit
 *
 * @param props - Props
 * @param model - Model
 *
 * @returns `toast`, `onClick` and `disabled`
 */
export function useCustomerFormSubmit(
  props: ICustomerFormProps,
  model: ReturnType<typeof useCustomerModel>
) {
  const { t } = useTranslation()
  const { refetch } = useContext(CustomersContext)
  const [toast, setToast] = useToast(8000, { isMultiline: true })
  const [createOrUpdateCustomer, { loading }] = useMutation(
    $create_or_update_customer
  )

  /**
   * On form submit
   */
  async function onClick() {
    try {
      await createOrUpdateCustomer({
        variables: {
          customer: model.$,
          update: !!props.edit
        }
      })
      if (props.panel) {
        setTimeout(props.panel.onSave, 1000)
      } else {
        setToast({
          text: t('customers.createSuccess', model),
          type: 'success'
        })
        model.reset()
        refetch()
      }
    } catch {
      setToast({
        text: t('customers.createError'),
        type: 'error'
      })
    }
  }
  return {
    toast,
    onClick,
    disabled: loading || !model.valid || !!toast
  }
}
