import { useMutation } from '@apollo/client'
import { useLabelsQuery } from 'graphql-queries/labels'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import $deleteLabel from './deleteLabel.gql'
import { ILabelFormProps } from './LabelForm'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<Labels />`
 *
 * @category Labels
 */
export function useLabels() {
  const { t } = useTranslation()
  const [items, { loading, refetch }] = useLabelsQuery()
  const [deleteLabel] = useMutation($deleteLabel)
  const [form, setForm] = useState<ILabelFormProps>({
    isOpen: false
  })
  const [ConfirmationDialog, getResponse] = useConfirmationDialog()

  const onDismiss = useCallback(() => {
    setForm({ isOpen: false })
  }, [])

  const onSave = useCallback(() => {
    refetch().then(() => setForm({ isOpen: false }))
  }, [])

  const onEdit = useCallback((label: LabelObject) => {
    setForm({ isOpen: true, edit: label })
  }, [])

  const onDelete = useCallback(
    async (label: LabelObject) => {
      const response = await getResponse({
        title: t('admin.labels.confirmDeleteTitle'),
        subText: t('admin.labels.confirmDeleteSubText', label),
        responses: [[t('common.yes'), true, true], [t('common.no')]]
      })
      if (response === true) {
        deleteLabel({ variables: { name: label.name } }).then(refetch)
      }
    },
    [deleteLabel]
  )

  useEffect(() => {
    refetch()
  }, [form])

  const columns = useColumns({ onEdit, onDelete })
  return {
    items,
    columns,
    loading,
    form: {
      ...form,
      onSave,
      onDismiss
    },
    setForm,
    ConfirmationDialog
  }
}
