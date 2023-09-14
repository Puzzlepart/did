import { DeleteLink, EditLink } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'

/**
 * Columns hook for Labels
 */
export function useColumns({ onEdit, onDelete }) {
  const { t } = useTranslation()
  return [
    createColumnDef('name', '', { maxWidth: 180 }, (label: LabelObject) => (
      <EntityLabel label={label} />
    )),
    createColumnDef('description', t('common.descriptionFieldLabel'), {
      isMultiline: true,
      minWidth: 180,
      data: { hidden: isMobile }
    }),
    createColumnDef(null, null, { minWidth: 180 }, (label: LabelObject) => (
      <div style={{ display: 'flex' }}>
        <EditLink style={{ marginRight: 6 }} onClick={() => onEdit(label)} />
        <DeleteLink onClick={() => onDelete(label)} />
      </div>
    ))
  ]
}
