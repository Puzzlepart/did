import { DeleteLink, EditLink } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Columns hook for Labels
 */
export function useColumns({ onEdit, onDelete }) {
  const { t } = useTranslation()
  return [
    col('name', '', { maxWidth: 180 }, (label: LabelObject) => (
      <EntityLabel label={label} />
    )),
    col('description', t('common.descriptionFieldLabel'), {
      isMultiline: true,
      minWidth: 180,
      data: { hidden: isMobile }
    }),
    col(null, null, { minWidth: 180 }, (label: LabelObject) => (
      <div style={{ display: 'flex' }}>
        <EditLink style={{ marginRight: 6 }} onClick={() => onEdit(label)} />
        <DeleteLink onClick={() => onDelete(label)} />
      </div>
    ))
  ]
}
