import { DynamicButton } from 'components'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from 'security'
import { StyledComponent } from 'types'
import { useCustomersContext } from '../../../context'
import { OPEN_CUSTOMER_PANEL } from '../../../reducer/actions'
import styles from './CustomerActions.module.scss'
import { useCustomerDeleteAction } from './DeleteAction'

/**
 * Component for displaying customer action buttons like delete and edit
 * 
 * @category Customers
 */
export const CustomerActions: StyledComponent = (props) => {
  const { state, dispatch } = useCustomersContext()
  const [, hasPermission] = usePermissions()
  const { t } = useTranslation()
  const onDelete = useCustomerDeleteAction()

  return (
    <div className={CustomerActions.className} hidden={props.hidden}>
      <div className={styles.container}>
        <DynamicButton
          hidden={!state.selected?.webLink}
          text={t('customers.webLinkText')}
          iconName='WebAsset'
          onClick={() => window.open(state.selected?.webLink, '_blank')}
          transparent
        />
        <DynamicButton
          hidden={!state.selected?.externalSystemURL}
          text={t('customers.externalSystemUrlText')}
          iconName='System'
          onClick={() =>
            window.open(state.selected?.externalSystemURL, '_blank')
          }
          transparent
        />
        <DynamicButton
          hidden={!hasPermission($.MANAGE_CUSTOMERS)}
          text={t('customers.deleteButtonLabel')}
          iconName='Delete'
          {...onDelete}
          disabled={!Boolean(state.selected)}
          transparent
        />
        <DynamicButton
          hidden={!hasPermission($.MANAGE_CUSTOMERS)}
          text={t('customers.editButtonLabel')}
          iconName='Edit'
          onClick={() => dispatch(OPEN_CUSTOMER_PANEL({ onDismissCallback: () => { } }))}
          disabled={!Boolean(state.selected)}
          transparent
        />
      </div>
      {onDelete.dialog}
    </div>
  )
}

CustomerActions.displayName = 'CustomerActions'
CustomerActions.className = styles.customerActions