import { useMutation } from '@apollo/client'
import { FormSubmitHook, useFormControlModel } from 'components/FormControl'
import { useToast } from 'components/Toast'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { omitTypename } from 'utils'
import { useCustomersContext } from '../context'
import $create_or_update_customer from './create-or-update-customer.gql'
import { ICustomerFormProps } from './types'

/**
 * Returns submit props used by `<FormControl />
`
 *
 * @param props - Props
 * @param model - Model
 *
 * @returns `toast`, `onClick` and `disabled`
 */
export const useCustomerFormSubmit: FormSubmitHook<
  ICustomerFormProps,
  ReturnType<typeof useFormControlModel>
> = (props, model) => {
  const { t } = useTranslation()
  const { refetch } = useCustomersContext()
  const [toast, setToast, isToastShowing] = useToast(8000)
  const [mutate, { loading }] = useMutation($create_or_update_customer)

  /**
   * On form submit
   */
  async function onClick() {
    try {
      await mutate({
        variables: {
          customer: omitTypename(model.$),
          update: !!props.edit
        }
      })
      setToast({
        text: t('customers.createSuccess', model.$ as Customer),
        onClick: () => {
          window.location.replace(
            `/customers/information/${model.value('key')}`
          )
        },
        intent: 'success'
      })
      window.setTimeout(() => {
        model.reset()
        refetch()
      }, 1000)
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
