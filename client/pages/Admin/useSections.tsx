/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { PERMISSION } from 'config/security/permissions'
import { usePermissions } from 'hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IPageSectionComponent } from '../types'
import { ApiTokens } from './ApiTokens'
import { Labels } from './Labels'
import { Roles } from './Roles'
import { SubscriptionSettings } from './Subscription'
import { Users } from './Users'

/**
 * @ignore
 */
export function useSections() {
  const { t } = useTranslation()
  const { hasPermission } = usePermissions()
  return useMemo<IPageSectionComponent[]>(
    () => [
      {
        itemKey: 'users',
        headerText: t('admin.users'),
        itemIcon: 'FabricUserFolder',
        hidden: !hasPermission(PERMISSION.MANAGE_USERS),
        component: <Users />
      },
      {
        itemKey: 'labels',
        headerText: t('admin.labels'),
        itemIcon: 'Label',
        component: <Labels />
      },
      {
        itemKey: 'rolesPermissions',
        headerText: t('admin.rolesPermissions'),
        itemIcon: 'SecurityGroup',
        hidden: !hasPermission(PERMISSION.MANAGE_ROLESPERMISSIONS),
        component: <Roles />
      },
      {
        itemKey: 'subscription',
        headerText: t('admin.subscriptionSettings'),
        itemIcon: 'Subscribe',
        hidden: !hasPermission(PERMISSION.MANAGE_SUBSCRIPTION),
        component: <SubscriptionSettings />
      },
      {
        itemKey: 'apiTokens',
        headerText: t('admin.apiTokens.headerText'),
        itemIcon: 'AzureAPIManagement',
        component: <ApiTokens />
      }
    ],
    []
  )
}
