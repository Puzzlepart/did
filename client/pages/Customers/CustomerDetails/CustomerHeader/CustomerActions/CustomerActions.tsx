import { DynamicButton } from 'components'
import { usePermissions } from 'hooks'
import {
  CLOSE_CUSTOMER_PANEL,
  OPEN_CUSTOMER_PANEL
} from 'pages/Customers/reducer'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import { CustomersContext } from '../../../context'
import styles from './CustomerActions.module.scss'

/**
 * @category Customers
 */
export const CustomerActions: StyledComponent = (props) => {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const context = useContext(CustomersContext)
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
    </div>
  )
}

CustomerActions.displayName = 'CustomerActions'
CustomerActions.className = styles.customerActions
