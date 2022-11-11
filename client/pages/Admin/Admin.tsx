/* eslint-disable unicorn/prevent-abbreviations */
import { TabContainer } from 'components/TabContainer'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { PermissionScope } from 'security'
import styles from './Admin.module.scss'
import { ApiTokens } from './ApiTokens'
import { Labels } from './Labels'
import { MissingSubmissions } from './MissingSubmissions'
import { Roles } from './Roles'
import { SubscriptionSettings } from './SubscriptionSettings'
import { Users } from './Users'

/**
 * @category Function Component
 */
export const Admin = () => {
  const { t } = useTranslation()
  const params = useParams<{ view: string }>()
  const [view, setView] = useState(params.view || 'users')
  const history = useHistory()

  return (
    <TabContainer
      className={styles.root}
      fixedLinkWidth={true}
      onTabChanged={(itemKey) => {
        setView(itemKey)
        history.push(`/admin/${itemKey}`)
      }}
      defaultSelectedKey={view}
    >
      <Users
        headerText={t('admin.users.headerText')}
        itemIcon='FabricUserFolder'
        permission={PermissionScope.LIST_USERS}
      />
      <MissingSubmissions
        headerText={t('admin.missingSubmissions.headerText')}
        itemIcon='EventDateMissed12'
      />
      <Labels headerText={t('admin.labels.headerText')} itemIcon='Label' />
      <Roles
        headerText={t('admin.rolesPermissions.headerText')}
        itemIcon='SecurityGroup'
        permission={PermissionScope.MANAGE_ROLESPERMISSIONS}
      />
      <SubscriptionSettings
        headerText={t('admin.subscriptionSettings.headerText')}
        itemIcon='Subscribe'
        permission={PermissionScope.MANAGE_SUBSCRIPTION}
      />
      <ApiTokens
        headerText={t('admin.apiTokens.headerText')}
        itemIcon='AuthenticatorApp'
        permission={PermissionScope.MANAGE_SUBSCRIPTION}
      />
    </TabContainer>
  )
}

export * from './ApiTokens'
export * from './Labels'
export * from './Roles'
export * from './SubscriptionSettings'
export * from './Users'
