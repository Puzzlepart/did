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
 * Get all available pages in the app, including the home page. Appends
 * the `path` and `text` properties to each page component so that it can
 * be used in the navigation menu.
 *
 * @returns The available page components
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
        text: t(`navigation.${page.name}`),
        path: `/${page.name.replace(/Home|Page/gm, '')}`.toLowerCase()
      })
    )
    return pages
  }, [])
}
