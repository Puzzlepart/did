/* eslint-disable @typescript-eslint/ban-types */
import { IListColumn } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { ComponentLogicHook } from 'hooks'
import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'

type UseColumnsHook = ComponentLogicHook<{}, IListColumn[]>

/**
 * Columns hook for Labels
 */
export const useColumns: UseColumnsHook = () => {
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
      })
    ],
    []
  )
}
