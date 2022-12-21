import { ActionButton } from '@fluentui/react'
import { usePermissions } from 'hooks'
import { CustomersContext } from 'pages/Customers/context'
import React, { FC, HTMLAttributes, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CustomerForm } from '../../../CustomerForm'
import styles from './Actions.module.scss'

/**
 * @category Customers
 */
export const Actions: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { state, loading, refetch } = useContext(CustomersContext)
  const [showEditPanel, setShowEditPanel] = useState(false)
  return (
    <div className={styles.root} hidden={props.hidden}>
      <div className={styles.container}>
        <div
          className={styles.actionItem}
          hidden={loading || !state.selected?.webLink}
        >
          <ActionButton
            text={t('customers.webLinkText')}
            href={state.selected?.webLink}
            iconProps={{ iconName: 'Website' }}
          />
        </div>
        <div
          className={styles.actionItem}
          hidden={loading || !state.selected?.externalSystemURL}
        >
          <ActionButton
            text={t('customers.externalSystemUrlText')}
            href={state.selected?.externalSystemURL}
            iconProps={{ iconName: 'System' }}
          />
        </div>
        <div
          className={styles.actionItem}
          hidden={!hasPermission(PermissionScope.MANAGE_CUSTOMERS)}
        >
          <ActionButton
            text={t('common.editLabel')}
            iconProps={{ iconName: 'Edit' }}
            onClick={() => setShowEditPanel(true)}
          />
          <CustomerForm
            key={state.selected?.key}
            edit={state.selected}
            panelProps={{
              isOpen: showEditPanel,
              headerText: state.selected?.name,
              isLightDismiss: true,
              onLightDismissClick: () => setShowEditPanel(false),
              onDismiss: () => setShowEditPanel(false),
              onSave: () => {
                setShowEditPanel(false)
                refetch()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
