import { DynamicButton, IListColumn } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { ComponentLogicHook } from 'hooks'
import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import styles from './Labels.module.scss'

type UseColumnsHook = ComponentLogicHook<
  {
    onEdit: (label: LabelObject) => void
    onDelete: (label: LabelObject) => void
  },
  IListColumn[]
>

/**
 * Columns hook for Labels
 */
export const useColumns: UseColumnsHook = ({ onEdit, onDelete }) => {
  const { t } = useTranslation()
  return useMemo(
    () => [
      createColumnDef('name', '', { maxWidth: 180 }, (label: LabelObject) => (
        <EntityLabel label={label} />
      )),
      createColumnDef('description', t('common.descriptionFieldLabel'), {
        isMultiline: true,
        minWidth: 180,
        data: { hidden: isMobile }
      }),
      createColumnDef<LabelObject>(null, null, { minWidth: 180 }, (label) => (
        <div className={styles.actionsColumn}>
          <DynamicButton
            text={t('common.editLabel')}
            onClick={() => onEdit(label)}
            iconName='NoteEdit'
            size='small'
          />
          <DynamicButton
            text={t('common.delete')}
            onClick={() => onDelete(label)}
            iconName='Delete'
            size='small'
          />
        </div>
      ))
    ],
    []
  )
}
