/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@apollo/client'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportLink } from '../../../../server/graphql'
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
    isOpen: false
  })
  const [ConfirmationDialog, getResponse] = useConfirmationDialog()

  /**
   * Callback function for after a report link is saved.
   */
  const onSave = useCallback(() => {
    query.refetch().then(() => setForm({ isOpen: false }))
  }, [query])

  /**
   * Callback function for when a report link is edited.
   */
  const onEdit = useCallback((reportLink: ReportLink) => {
    setForm({ isOpen: true, edit: reportLink })
  }, [])

  /**
   * Callback function for when the form is dismissed.
   */
  const onDismiss = useCallback(() => {
    setForm({ isOpen: false })
  }, [])

  /**
   * Callback function for deleting a report link.
   */
  const onDelete = useCallback(
    async (reportLink: ReportLink) => {
      const response = await getResponse({
        title: t('admin.reportLinks.confirmDeleteTitle'),
        subText: t('admin.reportLinks.confirmDeleteSubText', reportLink),
        responses: [[t('common.yes'), true, true], [t('common.no')]]
      })
      if (response === true) {
        deleteReportLink({ variables: { name: reportLink.name } }).then(
          query.refetch
        )
      }
    },
    [deleteReportLink]
  )

  useEffect(() => {
    query.refetch()
  }, [form])

  const columns = useColumns({ onEdit, onDelete })

  return {
    columns,
    form: {
      ...form,
      onSave,
      onDismiss
    },
    setForm,
    query,
    ConfirmationDialog
  } as const
}
