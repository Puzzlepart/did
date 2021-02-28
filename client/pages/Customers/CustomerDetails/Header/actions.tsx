/* eslint-disable tsdoc/syntax */
import { PERMISSION } from 'config/security/permissions'
import { DefaultButton } from 'office-ui-fabric-react'
import { CustomersContext } from 'pages/Customers/context'
import React, { FunctionComponent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePermissions } from '../../../../hooks'
import { CustomerForm } from '../../CustomerForm'
import styles from './Header.module.scss'

/**
 * @category Customers
 */
export const CustomerActions: FunctionComponent = () => {
  const { t } = useTranslation()
  const { hasPermission } = usePermissions()
  const { state, loading, refetch } = useContext(CustomersContext)
  const [showEditPanel, setShowEditPanel] = useState(false)
  return (
    <div className={styles.actions}>
      <div
        className={styles.actionItem}
        hidden={loading || !state.selected.webLink}>
        <DefaultButton
          text={t('customers.webLinkText')}
          href={state.selected.webLink}
          iconProps={{ iconName: 'Website' }}
        />
      </div>
      <div
        className={styles.actionItem}
        hidden={loading || !state.selected.externalSystemURL}>
        <DefaultButton
          text={t('customers.externalSystemUrlText')}
          href={state.selected.externalSystemURL}
          iconProps={{ iconName: 'System' }}
        />
      </div>
      <div
        className={styles.actionItem}
        hidden={!hasPermission(PERMISSION.MANAGE_CUSTOMERS)}>
        <DefaultButton
          text={t('common.editLabel')}
          iconProps={{ iconName: 'Edit' }}
          onClick={() => setShowEditPanel(true)}
        />
        <CustomerForm
          key={state.selected.key}
          edit={state.selected}
          panel={{
            isOpen: showEditPanel,
            headerText: state.selected.name,
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
  )
}
