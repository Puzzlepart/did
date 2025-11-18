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

  // Initialize model with common values from all selected customers
  useEffect(() => {
    /* eslint-disable no-console */
    console.log('🔍 [BulkEditCustomers] Initializing with customers:', props.customers.length)
    
    // Clear model and dirty fields when customers change
    model.$set(new Map())
    setDirtyFields(new Set())

    if (props.customers.length === 0) return

    const firstCustomer = props.customers[0]
    
    console.log('🏷️ [BulkEditCustomers] Customer labels:')
    for (let i = 0; i < props.customers.length; i++) {
      const c = props.customers[i]
      console.log(`  Customer ${i} (${c.name}):`, normalizeLabels(c.labels))
    }

    // Check if all customers have the same labels
    const firstLabels = normalizeLabels(firstCustomer.labels).sort()
    const allLabelsMatch = props.customers.every((c) => {
      const labels = normalizeLabels(c.labels).sort()
      return JSON.stringify(labels) === JSON.stringify(firstLabels)
    })
    
    console.log('✅ [BulkEditCustomers] All labels match:', allLabelsMatch)
    console.log('🏷️ [BulkEditCustomers] First customer labels:', firstLabels)
    
    // Build initial map with common values
    const initialMap = new Map<string, any>()
    
    if (allLabelsMatch && firstLabels.length > 0) {
      console.log('📝 [BulkEditCustomers] Setting labels to:', firstLabels)
      initialMap.set('labels', firstLabels)
    } else {
      console.log('❌ [BulkEditCustomers] Not setting labels (match:', allLabelsMatch, 'length:', firstLabels.length, ')')
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
    console.log('✓ [BulkEditCustomers] Model initialized, labels value:', model.value('labels'))
    /* eslint-enable no-console */
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
