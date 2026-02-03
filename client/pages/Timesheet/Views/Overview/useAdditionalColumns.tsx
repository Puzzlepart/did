import { CustomerLink } from 'components'
import $date from 'DateUtils'
import React, { useMemo } from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { useTimesheetContext } from '../../context'
import { ProjectColumn } from './ProjectColumn'

/**
 * Hook that returns additonal columns for the event list.
 * The `customer` column is only shown on desktop devices,
 * while the `project` column is always shown, but also
 * includes the customer link on mobile devices.
 */
export function useAdditionalColumns() {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const events = state.selectedPeriod?.getEvents() ?? []
  const multipleCustomersByDate = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const event of events) {
      const dateKey =
        event.date ?? $date.formatDate(event.startDateTime, 'YYYY-MM-DD')
      const customerKey =
        event.customer?.key ??
        event.customer?.id ??
        event.customer?.name ??
        ''
      if (!dateKey || !customerKey) continue
      if (!map.has(dateKey)) map.set(dateKey, new Set())
      map.get(dateKey)?.add(customerKey)
    }
    return map
  }, [events])

  const shouldShowCustomerLink = (event: EventObject) => {
    if (!isMobile) return false
    const dateKey =
      event.date ?? $date.formatDate(event.startDateTime, 'YYYY-MM-DD')
    const customers = multipleCustomersByDate.get(dateKey)
    return !!customers && customers.size > 1
  }
  return useMemo(
    () =>
      [
        isBrowser &&
          createColumnDef<EventObject>(
            'customer',
            t('common.customer'),
            { minWidth: 180, maxWidth: 400 },
            (event) => <CustomerLink customer={event.customer} />
          ),
        createColumnDef<EventObject>(
          'project',
          t('common.project'),
          { minWidth: 180, maxWidth: 500, data: { hideMobileLabel: true } },
          (event) => (
            <ProjectColumn
              event={event}
              includeCustomerLink={shouldShowCustomerLink(event)}
            />
          )
        )
      ].filter(Boolean),
    [multipleCustomersByDate, t]
  )
}
