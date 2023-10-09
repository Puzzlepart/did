import { useMutation, useQuery } from '@apollo/client'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportLink } from 'types'
import $deleteReportLink from './deleteReportLink.gql'
import $reportLinks from './reportLinks.gql'
import { IReportLinksFormProps } from './ReportLinksForm'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<ReportLinks />`. Handles querying
 * the GraphQL API for report links and managing the form state,
 * with callback functions for save, edit, delete and dismiss.
 *
 * @category Reports
 */
export function useReportLinks() {
  const { t } = useTranslation()
  const query = useQuery($reportLinks, { fetchPolicy: 'cache-first' })
  const [deleteReportLink] = useMutation($deleteReportLink)
  const [form, setForm] = useState<IReportLinksFormProps>({
    open: false
  })
  const [selectedLink, onSelectionChanged] = useState<ReportLink>(null)
  const [ConfirmationDialog, getResponse] = useConfirmationDialog()

  /**
   * Callback function for after a report link is saved.
   */
  const onSave = useCallback(() => {
    query.refetch().then(() => setForm({ open: false }))
  }, [query])

  /**
   * Callback function for when a report link is edited.
   */
  const onEdit = useCallback(() => {
    setForm({ open: true, edit: selectedLink })
  }, [selectedLink])

  /**
   * Callback function for when the form is dismissed.
   */
  const onDismiss = useCallback(() => {
    setForm({ open: false })
  }, [])

  /**
   * Callback function for deleting a report link.
   */
  const onDelete = useCallback(async () => {
    const response = await getResponse({
      title: t('admin.reportLinks.confirmDeleteTitle'),
      subText: t('admin.reportLinks.confirmDeleteSubText', selectedLink),
      responses: [
        [t('common.yes'), true, true],
        [t('common.no'), false, false]
      ]
    })
    if (!response) return
    deleteReportLink({ variables: { name: selectedLink.name } }).then(
      query.refetch
    )
  }, [selectedLink, deleteReportLink])

  useEffect(() => {
    query.refetch()
  }, [form])

  const columns = useColumns()

  return {
    columns,
    form: {
      ...form,
      onSave,
      onDismiss
    },
    setForm,
    query,
    ConfirmationDialog,
    onEdit,
    onDelete,
    selectedLink,
    onSelectionChanged
  }
}
