import { CustomerLink } from 'components'
import $date from 'DateUtils'
import React, { useEffect, useMemo, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { useTimesheetContext } from '../../context'
import { ProjectColumn } from './ProjectColumn'

const MOBILE_BREAKPOINT = 600

/**
 * Hook that returns additonal columns for the event list.
 * The `customer` column is only shown on wider screens,
 * while the `project` column is always shown, but can
 * include the customer link on narrow screens.
 */
export function useAdditionalColumns() {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  )
  const events = state.selectedPeriod?.getEvents() ?? []

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth <= MOBILE_BREAKPOINT)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useMemo(() => {
    const multipleCustomersByDate = new Map<string, Set<string>>()
    for (const event of events) {
      const dateKey =
        event.date ?? $date.formatDate(event.startDateTime, 'YYYY-MM-DD')
      const customerKey =
        event.customer?.key ?? event.customer?.id ?? event.customer?.name ?? ''
      if (!dateKey || !customerKey) continue
      if (!multipleCustomersByDate.has(dateKey))
        multipleCustomersByDate.set(dateKey, new Set())
      multipleCustomersByDate.get(dateKey)?.add(customerKey)
    }

    const showCustomerColumn = isBrowser && !isNarrowScreen

    const shouldShowCustomerLink = (event: EventObject) => {
      if (showCustomerColumn) return false
      const dateKey =
        event.date ?? $date.formatDate(event.startDateTime, 'YYYY-MM-DD')
      const customers = multipleCustomersByDate.get(dateKey)
      return !!customers && customers.size > 1
    }

    return [
      showCustomerColumn &&
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
    ].filter(Boolean)
  }, [events, isNarrowScreen, t])
}
