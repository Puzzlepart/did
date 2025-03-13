import { useMutation, useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { BaseResult, Customer, Project } from 'types'
import { useCustomersContext } from '../../../../context'
import { CUSTOMER_DELETE_SUCCESS } from '../../../../reducer'
import $deleteCustomer from './deleteCustomer.gql'
import { CustomerDeleteDialog } from './CustomerDeleteDialog'
import $projectsQuery from './projects.gql'
import { DialogState } from './types'

/**
 * Custom hook to handle the deletion of a customer.
 *
 * This hook manages the state and logic for deleting a customer, including
 * checking for associated projects and displaying appropriate messages
 * in a dialog.
 *
 * @returns An object containing:
 * - `onClick`: A function to initiate the deletion process.
 * - `disabled`: A boolean indicating if the delete action is disabled.
 * - `dialog`: A JSX element representing the delete confirmation dialog.
 */
export function useCustomerDeleteAction() {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const history = useHistory()
  const context = useCustomersContext()
  const [dialogState, setDialogState] = useState<DialogState>('hidden')
  const [message, setMessage] = useState<string>()
  const query = useQuery<{
    projects: Project[]
  }>($projectsQuery, {
    variables: {
      customerKey: context.state.selected?.key
    },
    skip: !context.state.selected || dialogState !== 'checking'
  })
  const [deleteCustomer] = useMutation<{ result: BaseResult }>($deleteCustomer)

  /**
   * Handles the deletion of a customer.
   *
   * This function performs the following steps:
   * 1. Hides the dialog.
   * 2. Sends a request to delete the customer.
   * 3. Displays a toast notification based on the success or failure of the deletion.
   * 4. Refetches the customer context if the deletion is successful.
   *
   * @param  customer - The customer to be deleted.
   *
   * @returns A promise that resolves when the deletion process is complete.
   */
  const onDelete = async (customer: Customer) => {
    setDialogState('hidden')
    setMessage(null)
    const { data } = await deleteCustomer({
      variables: {
        key: customer.key
      }
    })
    if (!data.result.success) {
      displayToast(t('customers.deleteFailed', customer), 'error', 8, {
        headerText: t('customers.deleteFailedTitle')
      })
      return
    }
    await displayToast(t('customers.deleteSuccess', customer), 'success', 5, {
      headerText: t('customers.deleteSuccessTitle')
    })
    history.push('/customers')
    context.dispatch(CUSTOMER_DELETE_SUCCESS())
  }

  useEffect(() => {
    switch (dialogState) {
      case 'checking': {
        if (query.loading) return
        if (query.error) {
          setDialogState('error')
          setMessage(query.error.message)
          return
        }
        if (query.data?.projects.length > 0) {
          setDialogState('error')
          setMessage(
            t('customers.deleteError', { count: query.data.projects.length })
          )
          return
        }
        setDialogState('success')
        setMessage(t('customers.checkSuccess'))
        return
      }
    }
  }, [dialogState, query.loading])

  const dialog = (
    <CustomerDeleteDialog
      customer={context.state.selected}
      state={dialogState}
      setState={setDialogState}
      message={message}
      loading={query.loading}
      onDelete={onDelete}
    />
  )

  return {
    onClick: () => setDialogState('initial'),
    disabled: query.loading,
    dialog
  }
}
