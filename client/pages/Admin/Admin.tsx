import { Tabs } from 'components/Tabs'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiTokens } from './ApiTokens'
import { Labels } from './Labels'
import { MissingSubmissions } from './MissingSubmissions'
import { ReportLinks } from './ReportLinks'
import { RolesPermissions } from './RolesPermissions'
import { SubscriptionSettings } from './SubscriptionSettings'
import { Users } from './Users'

/**
 * @category Function Component
 */
export const Admin: FC = () => {
  const { t } = useTranslation()
  return (
    <Tabs
      items={{
        users: [Users, t('admin.users.headerText')],
        missingSubmissions: [
          MissingSubmissions,
          t('admin.missingSubmissions.headerText')
        ],
        labels: [Labels, t('admin.labels.headerText')],
        roles: [RolesPermissions, t('admin.rolesPermissions.headerText')],
        subscription: [
          SubscriptionSettings,
          t('admin.subscriptionSettings.headerText')
        ],
        reportLinks: [ReportLinks, t('admin.reportLinks.headerText')],
        apiTokens: [ApiTokens, t('admin.apiTokens.headerText')]
      }}
    />
  )
}

Admin.displayName = 'Admin'