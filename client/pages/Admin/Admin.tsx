/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { TabContainer } from 'components/TabContainer'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { PermissionScope } from 'security'
import styles from './Admin.module.scss'
import { ApiTokens } from './ApiTokens'
import { Labels } from './Labels'
import { Roles } from './Roles'
import { SubscriptionSettings } from './Subscription'
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
      onLinkClick={({ props }) => {
        setView(props.itemKey)
        history.push(`/admin/${props.itemKey}`)
      }}
      selectedKey={view}>
      <Users
        headerText={t('admin.users')}
        itemIcon='FabricUserFolder'
        permission={PermissionScope.MANAGE_USERS}
      />
      <Labels headerText={t('admin.labels')} itemIcon='Label' />
      <Roles
        headerText={t('admin.rolesPermissions')}
        itemIcon='SecurityGroup'
        permission={PermissionScope.MANAGE_ROLESPERMISSIONS}
      />
      <SubscriptionSettings
        headerText={t('admin.subscriptionSettings')}
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
export * from './Subscription'
export * from './Users'
