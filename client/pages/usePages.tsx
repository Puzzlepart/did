/* eslint-disable react-hooks/exhaustive-deps */
import { INavItemProps } from 'app/Navigation'
import { PERMISSION } from 'config/security/permissions'
import { usePermissions } from 'hooks'
import {
  AdminPage,
  CustomersPage,
  Home,
  ProjectsPage,
  ReportsPage,
  TimesheetPage
} from 'pages'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { IPageComponent } from './types'

type UsePages = {
  pages: IPageComponent[]
  nav: INavItemProps[]
}

export function usePages(): UsePages {
  const { t } = useTranslation()
  const { hasPermission } = usePermissions()
  const pages: IPageComponent[] = [
    {
      text: t('navigation.timesheet'),
      iconName: 'TimeSheet',
      path: '/timesheet',
      hidden: !hasPermission(PERMISSION.ACCESS_TIMESHEET),
      component: <TimesheetPage />
    },
    {
      text: t('navigation.customers'),
      iconName: 'People',
      path: '/customers',
      hidden: !hasPermission(PERMISSION.ACCESS_CUSTOMERS),
      component: <CustomersPage />
    },
    {
      text: t('navigation.projects'),
      iconName: 'ProjectCollection',
      path: '/projects',
      hidden: !hasPermission(PERMISSION.ACCESS_PROJECTS),
      component: <ProjectsPage />
    },
    {
      text: t('navigation.reports'),
      iconName: 'ReportDocument',
      path: '/reports',
      hidden: !hasPermission(PERMISSION.ACCESS_REPORTS),
      component: <ReportsPage />
    },
    {
      text: t('navigation.admin'),
      iconName: 'Settings',
      path: '/admin',
      hidden: !hasPermission(PERMISSION.ACCESS_ADMIN),
      component: <AdminPage />
    },
    {
      path: '/',
      component: <Home />
    }
  ]
  return {
    pages,
    nav: pages
      .filter((page) => !!page.text)
      .map((page) => ({
        text: undefined,
        iconName: undefined,
        ...pick(page, 'text', 'iconName', 'hidden', 'sections'),
        to: page.path
      }))
  }
}
