import { Button } from '@fluentui/react-components'
import { usePermissions } from 'hooks'
import {
  CLOSE_CUSTOMER_PANEL,
  OPEN_CUSTOMER_PANEL
} from 'pages/Customers/reducer'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
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
        <Button
          disabled={!context.state.selected?.webLink}
          appearance='transparent'
          icon={icon('WebAsset')}
          onClick={() => window.open(context.state.selected?.webLink, '_blank')}
        >
          {t('customers.webLinkText')}
        </Button>
        <Button
          disabled={!context.state.selected?.externalSystemURL}
          appearance='transparent'
          icon={icon('System')}
          onClick={() =>
            window.open(context.state.selected?.externalSystemURL, '_blank')
          }
        >
          {t('customers.externalSystemUrlText')}
        </Button>
        <Button
          disabled={!hasPermission(PermissionScope.MANAGE_CUSTOMERS)}
          appearance='transparent'
          icon={icon('AddCircle')}
          onClick={() =>
            context.dispatch(
              OPEN_CUSTOMER_PANEL({
                onDismissCallback: () =>
                  context.dispatch(CLOSE_CUSTOMER_PANEL())
              })
            )
          }
        >
          {t('customers.editButtonLabel')}
        </Button>
      </div>
    </div>
  )
}

CustomerActions.displayName = 'CustomerActions'
CustomerActions.className = styles.customerActions
