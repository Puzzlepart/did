import { useMutation } from '@apollo/client'
import { FormSubmitHook } from 'components/FormControl'
import { useToast } from 'components/Toast'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import $create_or_update_customer from './create-or-update-customer.gql'
import { ICustomerFormProps } from './types'
import { useCustomerModel } from './useCustomerModel'

/**
 * Returns submit props used by `<FormControl />`
 *
 * @param props - Props
 * @param model - Model
 *
 * @returns `toast`, `onClick` and `disabled`
 */
export const useCustomerFormSubmit: FormSubmitHook<
  ICustomerFormProps,
  ReturnType<typeof useCustomerModel>
> = (props, model) => {
  const { t } = useTranslation()
  const { refetch } = useContext(CustomersContext)
  const [toast, setToast, isToastShowing] = useToast(8000)
  const [mutate, { loading }] = useMutation($create_or_update_customer)

  /**
   * On form submit
   */
  async function onClick() {
    try {
      await mutate({
        variables: {
          customer: model.$,
          update: !!props.edit
        }
      })
      if (props.panelProps) {
        setTimeout(props.panelProps.onSave, 1000)
      } else {
        setToast({
          text: t('customers.createSuccess', model.$),
          intent: 'success'
        })
        model.reset()
        refetch()
      }
    } catch {
      setToast({
        text: t('customers.createError'),
        intent: 'error'
      })
    }
  }
  return {
    toast,
    text: props.edit ? t('common.save') : t('common.add'),
    onClick,
    disabled: loading || isToastShowing
  }
}
