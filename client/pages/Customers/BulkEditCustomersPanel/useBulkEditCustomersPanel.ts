import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { IBulkEditCustomersPanelProps } from './types'
import $updateCustomers from '../../../graphql-mutations/customer/updateCustomers.gql'
import { Customer } from 'types'

export function useBulkEditCustomersPanel(
  props: IBulkEditCustomersPanelProps
) {
  const [updateCustomers] = useMutation($updateCustomers)
  const [inactive, setInactive] = useState<boolean | null>(null)
  const [labels, setLabels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates: Partial<Customer> = {}
      if (inactive !== null) updates.inactive = inactive
      if (labels.length > 0) updates.labels = labels

      const customersToUpdate = props.customers.map((customer) => ({
        key: customer.key,
        name: customer.name,
        description: customer.description || '',
        icon: customer.icon,
        webLink: customer.webLink,
        externalSystemURL: customer.externalSystemURL,
        ...updates
      }))

      await updateCustomers({
        variables: {
          customers: customersToUpdate
        }
      })

      await props.onSave(updates)
      props.onDismiss()
    } catch {
      // Error is handled by Apollo Client
    } finally {
      setLoading(false)
    }
  }

  return {
    inactive,
    setInactive,
    labels,
    setLabels,
    loading,
    handleSave
  }
}
