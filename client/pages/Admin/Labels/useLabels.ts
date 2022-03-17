/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { LabelObject } from 'types'
import $deleteLabel from './deleteLabel.gql'
import { ILabelFormProps } from './LabelForm'
import $labels from './labels.gql'
import { useColumns } from './useColumns'
import { useTranslation } from 'react-i18next'

/**
 * Component logic hook for `<Labels />`
 *
 * @category Labels
 */
export function useLabels() {
  const { t } = useTranslation()
  const query = useQuery($labels, {
    fetchPolicy: 'cache-first'
  })
  const [deleteLabel] = useMutation($deleteLabel)
  const [form, setForm] = useState<ILabelFormProps>({
    isOpen: false
  })
  const [confirmDeleteDialog, getConfirmDeleteResponse] = useConfirmationDialog()

  const onDismiss = useCallback(() => {
    setForm({ isOpen: false })
  }, [])

  const onSave = useCallback(() => {
    query.refetch().then(() => setForm({ isOpen: false }))
  }, [query])

  const onEdit = useCallback((label: LabelObject) => {
    setForm({ isOpen: true, edit: label })
  }, [])

  const onDelete = useCallback(async (label: LabelObject) => {
    const response = await getConfirmDeleteResponse({
      title: t('admin.confirmDeleteLabelTitle'),
      subText: t('admin.confirmDeleteLabelSubText', label),
      responses: [[t('common.yes'), true, true], [t('common.no'), false]]
    })
    if (response) {
      deleteLabel({ variables: { name: label.name } }).then(query.refetch)
    }
  }, [deleteLabel])

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
    confirmDeleteDialog
  }
}
