import { DynamicButton } from 'components'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import { useCustomersContext } from '../../../context'
import {
  CLOSE_CUSTOMER_PANEL,
  OPEN_CUSTOMER_PANEL
} from '../../../reducer/actions'
import styles from './CustomerActions.module.scss'
import { useCustomerDeleteAction } from './DeleteAction'

/**
 * Component for displaying customer action buttons like delete and edit
 *
 * @category Customers
 */
export const CustomerActions: StyledComponent = (props) => {
  const context = useCustomersContext()
  const [, hasPermission] = usePermissions()
  const { t } = useTranslation()
  const onDelete = useCustomerDeleteAction()

  return (
    <div className={CustomerActions.className} hidden={props.hidden}>
      <div className={styles.container}>
        <DynamicButton
          hidden={!context.state.selected?.webLink}
          text={t('customers.webLinkText')}
          iconName='WebAsset'
          onClick={() => window.open(context.state.selected?.webLink, '_blank')}
          transparent
        />
        <DynamicButton
          hidden={!context.state.selected?.externalSystemURL}
          text={t('customers.externalSystemUrlText')}
          iconName='System'
          onClick={() =>
            window.open(context.state.selected?.externalSystemURL, '_blank')
          }
          transparent
        />
        <DynamicButton
          hidden={!hasPermission(PermissionScope.DELETE_CUSTOMERS)}
          text={t('customers.deleteButtonLabel')}
          iconName='Delete'
          {...onDelete}
          disabled={!Boolean(context.state.selected)}
          transparent
        />
        <DynamicButton
          hidden={!hasPermission(PermissionScope.MANAGE_CUSTOMERS)}
          text={t('customers.editButtonLabel')}
          iconName='Edit'
          onClick={() =>
            context.dispatch(
              OPEN_CUSTOMER_PANEL({
                onDismissCallback: () =>
                  context.dispatch(CLOSE_CUSTOMER_PANEL())
              })
            )
          }
          transparent
        />
      </div>
      {onDelete.dialog}
    </div>
  )
}

CustomerActions.displayName = 'CustomerActions'
CustomerActions.className = styles.customerActions
