import { CustomerLink } from 'components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { ProjectColumn } from './ProjectColumn'
import { isBrowser, isMobile } from 'react-device-detect'

/**
 * Hook that returns additonal columns for the event list.
 * The `customer` column is only shown on desktop devices,
 * while the `project` column is always shown, but also
 * includes the customer link on mobile devices.
 */
export function useAdditionalColumns() {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        isBrowser && createColumnDef<EventObject>(
          'customer',
          t('common.customer'),
          { minWidth: 150, maxWidth: 200 },
          (event) => <CustomerLink customer={event.customer} />
        ),
        createColumnDef<EventObject>(
          'project',
          t('common.project'),
          { minWidth: 150, maxWidth: 300 },
          (event) => <ProjectColumn event={event} includeCustomerLink={isMobile} />
        )
      ].filter(Boolean),
    []
  )
}
