import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook, useFormControlModel } from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import { omitTypename } from 'utils'
import { useCustomersContext } from '../context'
import $create_or_update_customer from './create-or-update-customer.gql'
import { CreateOrUpdateCustomerVariables, ICustomerFormProps } from './types'

/**
 * Returns submit props used by `<FormControl />.
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
  const context = useCustomersContext()
  const { displayToast } = useAppContext()
  const [createOrUpdateCustomer, { loading }] = useMutation<
    any,
    CreateOrUpdateCustomerVariables
  >($create_or_update_customer)

  /**
   * On form submit
   */
  async function onClick() {
    const variables: CreateOrUpdateCustomerVariables = {
      customer: omitTypename(model.$),
      update: !!props.edit
    }
    try {
      await createOrUpdateCustomer({ variables })
      displayToast(
        variables.update
          ? t('customers.updateSuccess', variables.customer)
          : t('customers.createSuccess', variables.customer),
        'success',
        6,
        {
          onClick: () => {
            if (variables.update) return
            window.location.replace(
              `/customers/${variables.customer.key}/projects`
            )
          }
        }
      )
      model.reset()
      context.refetch()
    } catch {
      if (variables.update) {
        displayToast(t('customers.updateError', variables.customer), 'error')
        return
      }
      displayToast(t('customers.createError'), 'error')
    }
  }
  return {
    text: props.edit ? t('common.save') : t('common.add'),
    onClick,
    disabled: loading
  }
}
