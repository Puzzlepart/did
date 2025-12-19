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

  // Store original set method before any overriding
  const originalSetRef = useRef<typeof model.set>(null)
  if (!originalSetRef.current) {
    originalSetRef.current = model.set.bind(model)
    // Override set method immediately to track changes
    model.set = (key: string, value: any) => {
      setDirtyFields((prev) => new Set(prev).add(key))
      return originalSetRef.current(key, value)
    }
  }

  const normalizeLabels = (labels: Customer['labels']) =>
    (labels ?? []).map((label) =>
      typeof label === 'string' ? label : label?.name
    )

  const getSortedLabels = (labels: Customer['labels']) =>
    [...normalizeLabels(labels)].sort()

  // Initialize model with common values from all selected customers
  useEffect(() => {
    // Clear model and dirty fields when customers change
    model.$set(new Map())
    setDirtyFields(new Set())

    if (props.customers.length === 0) return

    const firstCustomer = props.customers[0]

    // Check if all customers have the same labels
    const firstLabels = getSortedLabels(firstCustomer.labels)
    const allLabelsMatch = props.customers.every((c) => {
      const labels = getSortedLabels(c.labels)
      return JSON.stringify(labels) === JSON.stringify(firstLabels)
    })

    // Build initial map with common values
    const initialMap = new Map<string, any>()

    if (allLabelsMatch && firstLabels.length > 0) {
      initialMap.set('labels', firstLabels)
    }

    // Check if all customers have the same inactive status
    const allInactiveMatch = props.customers.every(
      (c) => c.inactive === firstCustomer.inactive
    )
    if (allInactiveMatch && firstCustomer.inactive !== undefined) {
      initialMap.set('inactive', firstCustomer.inactive)
    }
    // Set all values at once using $set
    model.$set(initialMap)
  }, [props.customers])

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates: Partial<Customer> = {}

      // Only include fields that were actually changed
      if (dirtyFields.has('inactive')) {
        updates.inactive = model.value('inactive')
      }
      const labelsValue = model.value('labels')
      if (labelsValue !== undefined) {
        updates.labels = labelsValue ?? []
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

      const result = await updateCustomers({
        variables: {
          customers: customersToUpdate
        }
      })

      const data = result.data?.updateCustomers
      if (data?.success) {
        await propsRef.current.onSave(updates)
        propsRef.current.onDismiss()
      } else if (data?.errors && data.errors.length > 0) {
        // Show error message with details
        const errorMessage = `${data.successCount} of ${
          customersToUpdate.length
        } customers updated successfully. ${
          data.failureCount
        } failed: ${data.errors
          .map((e) => `${e.customerKey}: ${e.message}`)
          .join(', ')}`
        alert(errorMessage)
        // Still close the panel and refresh even with partial success
        await propsRef.current.onSave(updates)
        propsRef.current.onDismiss()
      }
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
