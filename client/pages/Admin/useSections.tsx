/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { TabComponent } from 'components'
import { usePermissions } from 'hooks'
import { IPivotItemProps } from 'office-ui-fabric-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ApiTokens } from './ApiTokens'
import { Labels } from './Labels'
import { Roles } from './Roles'
import { SubscriptionSettings } from './Subscription'
import { Users } from './Users'

/**
 * Defines a page section component
 *
 * @category Pages
 */
export interface IAdminSectionComponent extends IPivotItemProps {
  component: TabComponent
  permission?: PermissionScope
}

/**
 * @ignore
 */
export function useSections() {
  const { t } = useTranslation()
  const { hasPermission } = usePermissions()
  return useMemo<IAdminSectionComponent[]>(
    () => [
      {
        itemKey: 'users',
        headerText: t('admin.users'),
        itemIcon: 'FabricUserFolder',
        hidden: !hasPermission(PermissionScope.MANAGE_USERS),
        component: Users
      },
      {
        itemKey: 'labels',
        headerText: t('admin.labels'),
        itemIcon: 'Label',
        component: Labels
      },
      {
        itemKey: 'rolesPermissions',
        headerText: t('admin.rolesPermissions'),
        itemIcon: 'SecurityGroup',
        hidden: !hasPermission(PermissionScope.MANAGE_ROLESPERMISSIONS),
        component: Roles
      },
      {
        itemKey: 'subscription',
        headerText: t('admin.subscriptionSettings'),
        itemIcon: 'Subscribe',
        hidden: !hasPermission(PermissionScope.MANAGE_SUBSCRIPTION),
        component: SubscriptionSettings
      },
      {
        itemKey: 'apiTokens',
        headerText: t('admin.apiTokens.headerText'),
        itemIcon: 'AzureAPIManagement',
        component: ApiTokens
      }
    ],
    []
  )
}
