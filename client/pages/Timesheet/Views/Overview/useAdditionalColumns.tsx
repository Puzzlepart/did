import { CustomerLink } from 'components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { ProjectColumn } from './ProjectColumn'

/**
 * Use additonal columns
 */
export function useAdditionalColumns() {
  const { t } = useTranslation()
  return useMemo(
    () => [
      createColumnDef(
        'customer',
        t('common.customer'),
        { minWidth: 150, maxWidth: 200 },
        (event: EventObject) => <CustomerLink customer={event.customer} />
      ),
      createColumnDef(
        'project',
        t('common.project'),
        { minWidth: 150, maxWidth: 300 },
        (event: EventObject) => <ProjectColumn event={event} />
      )
    ],
    []
  )
}
