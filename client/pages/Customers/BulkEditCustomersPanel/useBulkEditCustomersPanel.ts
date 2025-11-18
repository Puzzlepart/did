import { useMutation } from '@apollo/client'
import { useState, useRef, useEffect } from 'react'
import { useMap } from 'hooks/common/useMap'
import { IBulkEditCustomersPanelProps } from './types'
import $updateCustomers from '../../../graphql-mutations/customer/updateCustomers.gql'
import { Customer } from 'types'

export function useBulkEditCustomersPanel(props: IBulkEditCustomersPanelProps) {
  const [updateCustomers] = useMutation($updateCustomers)
  const [loading, setLoading] = useState(false)
  const propsRef = useRef(props)

  // Track which fields have been modified by the user
  const [dirtyFields, setDirtyFields] = useState<Set<string>>(new Set())

  useEffect(() => {
    propsRef.current = props
  }, [props])

  // Create a model using useMap for form control compatibility
  const model = useMap<string, Partial<Customer>>(new Map())

  // Track field changes
  const originalSet = model.set
  model.set = (key: string, value: any) => {
    setDirtyFields((prev) => new Set(prev).add(key))
    return originalSet(key, value)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates: Partial<Customer> = {}

      // Only include fields that were actually changed
      if (dirtyFields.has('inactive')) {
        updates.inactive = model.value('inactive')
      }
      if (dirtyFields.has('labels')) {
        updates.labels = model.value('labels', [])
      }

      const customersToUpdate = propsRef.current.customers.map((customer) => ({
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

      await propsRef.current.onSave(updates)
      propsRef.current.onDismiss()
    } catch {
      // Error is handled by Apollo Client
    } finally {
      setLoading(false)
    }
  }

  return {
    model,
    loading,
    handleSave
  }
}
