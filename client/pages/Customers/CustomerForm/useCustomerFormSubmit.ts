import { useMutation } from '@apollo/client'
import { ISubmitProps } from 'components/FormControl'
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
export function useCustomerFormSubmit(
  props: ICustomerFormProps,
  model: ReturnType<typeof useCustomerModel>
): ISubmitProps {
  const { t } = useTranslation()
  const { refetch } = useContext(CustomersContext)
  const [toast, setToast] = useToast(8000, { isMultiline: true })
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
    text: props.edit ? t('common.save') : t('common.add'),
    onClick,
    disabled: loading || !model.valid || !!toast
  }
}
