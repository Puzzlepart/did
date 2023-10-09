import { useMutation } from '@apollo/client'
import { useLabelsQuery } from 'graphql-queries/labels'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { ILabelFormProps } from './LabelForm'
import $deleteLabel from './deleteLabel.gql'
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
    open: false
  })
  const [selectedLabel, onSelectionChanged] = useState<LabelObject>(null)
  const [ConfirmationDialog, getResponse] = useConfirmationDialog()

  const onDismiss = useCallback(() => {
    setForm({ open: false })
  }, [])

  const onSave = useCallback(() => {
    refetch().then(() => setForm({ open: false }))
  }, [])

  const onEdit = useCallback(() => {
    setForm({ open: true, edit: selectedLabel })
  }, [selectedLabel])

  const onDelete = useCallback(async () => {
    const response = await getResponse({
      title: t('admin.labels.confirmDeleteTitle'),
      subText: t('admin.labels.confirmDeleteSubText', selectedLabel),
      responses: [[t('common.yes'), true, true], [t('common.no')]]
    })
    if (response === true) {
      deleteLabel({ variables: { name: selectedLabel.name } }).then(refetch)
    }
  }, [deleteLabel, selectedLabel])

  useEffect(() => {
    refetch()
  }, [form])

  const columns = useColumns()
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
    ConfirmationDialog,
    onEdit,
    onDelete,
    onSelectionChanged,
    selectedLabel
  }
}
