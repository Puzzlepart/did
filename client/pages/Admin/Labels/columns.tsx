import { DeleteLink, EditLink } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { TFunction } from 'i18next'
import React from 'react'
import { LabelObject } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Returns the columns for the Label list
 *
 * @param onEdit - On edit callback
 * @param onDelete - On delete callback
 * @param t - Translate function
 */
export const LabelColumns = (
  onEdit: (label: LabelObject) => void,
  onDelete: (label: LabelObject) => void,
  t: TFunction
) => [
  col(
    'name',
    t('common.nameFieldLabel'),
    { maxWidth: 180 },
    (label: LabelObject) => <EntityLabel label={label} />
  ),
  col('description', t('common.descriptionFieldLabel')),
  col(null, null, { minWidth: 180 }, (label: LabelObject) => (
    <div style={{ display: 'flex' }}>
      <EditLink style={{ marginRight: 12 }} onClick={() => onEdit(label)} />
      <DeleteLink onClick={() => onDelete(label)} />
    </div>
  ))
]
