import { PageComponent } from 'pages/types'
import * as React from 'react'
import { PermissionScope } from 'security'
import { Reports } from './Reports'

/**
 * Reports page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * `react-router-dom` to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const ReportsPage: PageComponent = () => {
  return <Reports />
}

ReportsPage.displayName = 'ReportsPage'
ReportsPage.iconName = 'ListBar'
ReportsPage.permission = PermissionScope.ACCESS_REPORTS
