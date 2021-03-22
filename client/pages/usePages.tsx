/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AdminPage,
  CustomersPage,
  Home,
  ProjectsPage,
  ReportsPage,
  TimesheetPage
} from 'pages'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PageComponent } from './types'

/**
 * Get all available pages in the app
 *
 * @returns The available page instances (`pages`), and
 * `nav` used for the navigation
 *
 * @category React Hook
 */
export function usePages(): PageComponent[] {
  const { t } = useTranslation()
  return useMemo(() => {
    const pages: PageComponent[] = [
      TimesheetPage,
      CustomersPage,
      ProjectsPage,
      ReportsPage,
      AdminPage,
      Home
    ].map((page) =>
      Object.assign(page, {
        displayName: t(`navigation.${page.name}`),
        path: `/${page.name.replace(/Home|Page/gm, '')}`.toLowerCase()
      })
    )
    return pages
  }, [])
}
