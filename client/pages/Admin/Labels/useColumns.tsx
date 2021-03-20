import { DeleteLink, EditLink } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Returns the columns for the Label list
 */
export function useColumns({ onEdit, onDelete }) {
  const { t } = useTranslation()
  return [
    col(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 180 },
      (label: LabelObject) => <EntityLabel label={label} />
    ),
    col('description', t('common.descriptionFieldLabel'), {
      isMultiline: true
    }),
    col(null, null, { minWidth: 180 }, (label: LabelObject) => (
      <div style={{ display: 'flex' }}>
        <EditLink style={{ marginRight: 12 }} onClick={() => onEdit(label)} />
        <DeleteLink onClick={() => onDelete(label)} />
      </div>
    ))
  ]
}
