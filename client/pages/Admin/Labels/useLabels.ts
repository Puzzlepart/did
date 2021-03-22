/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
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
  const query = useQuery($labels, {
    fetchPolicy: 'cache-first'
  })
  const [deleteLabel] = useMutation($deleteLabel)
  const [form, setForm] = useState<ILabelFormProps>({
    isOpen: false
  })

  const onDismiss = () => {
    setForm({ isOpen: false })
  }
  const onSave = () => {
    query.refetch().then(() => setForm({ isOpen: false }))
  }
  const onEdit = (label: LabelObject) => {
    setForm({ isOpen: true, label })
  }
  const onDelete = (label: LabelObject) =>
    deleteLabel({ variables: { name: label.name } }).then(query.refetch)

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
    t
  }
}
