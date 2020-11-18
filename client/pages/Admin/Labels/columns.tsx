import { EntityLabel } from 'components/EntityLabel'
import { TFunction } from 'i18next'
import { DefaultButton } from 'office-ui-fabric'
import React from 'react'
import { LabelObject } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Returns the columns for the Label list
 *
 * @param {void} onEdit On edit callback
 * @param {void} onDelete On delete callback
 * @param {TFunction} t Translate function
 */
export const LabelColumns = (
  onEdit: (label: LabelObject) => void,
  onDelete: (label: LabelObject) => void,
  t: TFunction
) => [
  col('name', t('common.nameFieldLabel'), { maxWidth: 180 }, (label: LabelObject) => (
    <EntityLabel label={label} />
  )),
  col('description', t('common.descriptionFieldLabel')),
  col(null, null, { minWidth: 180 }, (label: LabelObject) => (
    <>
      <DefaultButton
        styles={{ root: { marginRight: 4 } }}
        text={t('common.editLabel')}
        onClick={() => onEdit(label)}
      />
      <DefaultButton text={t('common.delete')} onClick={() => onDelete(label)} />
    </>
  ))
]
