/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import $deleteLabel from './deleteLabel.gql'
import { ILabelFormProps } from './LabelForm'
import $labels from './labels.gql'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<Labels />`
 *
 * @category Labels
 */
export function useLabels() {
  const { t } = useTranslation()
  const query = useQuery($labels, { fetchPolicy: 'cache-first' })
  const [deleteLabel] = useMutation($deleteLabel)
  const [form, setForm] = useState<ILabelFormProps>({
    isOpen: false
  })
  const [ConfirmationDialog, getResponse] = useConfirmationDialog()

  const onDismiss = useCallback(() => {
    setForm({ isOpen: false })
  }, [])

  const onSave = useCallback(() => {
    query.refetch().then(() => setForm({ isOpen: false }))
  }, [query])

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
        deleteLabel({ variables: { name: label.name } }).then(query.refetch)
      }
    },
    [deleteLabel]
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
  }
}
