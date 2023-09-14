import { Button } from '@fluentui/react-components'
import { usePermissions } from 'hooks'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import useBoolean from 'usehooks-ts/dist/esm/useBoolean/useBoolean'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { CustomersContext } from '../../../context'
import { CustomerForm } from '../../../CustomerForm'
import styles from './CustomerActions.module.scss'

/**
 * @category Customers
 */
export const CustomerActions: StyledComponent = (props) => {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { state, refetch } = useContext(CustomersContext)
  const { value: showEditPanel, toggle: toggleEditPanel } = useBoolean(false)
  return (
    <div className={CustomerActions.className} hidden={props.hidden}>
      <div className={styles.container}>
        <Button
          disabled={!state.selected?.webLink}
          appearance='transparent'
          icon={icon('WebAsset')}
          onClick={() => window.open(state.selected?.webLink, '_blank')}
        >
          {t('customers.webLinkText')}
        </Button>
        <Button
          disabled={!state.selected?.externalSystemURL}
          appearance='transparent'
          icon={icon('System')}
          onClick={() =>
            window.open(state.selected?.externalSystemURL, '_blank')
          }
        >
          {t('customers.externalSystemUrlText')}
        </Button>
        <Button
          disabled={!hasPermission(PermissionScope.MANAGE_CUSTOMERS)}
          appearance='transparent'
          icon={icon('TableEdit')}
          onClick={toggleEditPanel}
        >
          {t('customers.editButtonLabel')}
        </Button>
        <CustomerForm
          key={state.selected?.key}
          edit={state.selected}
          panelProps={{
            isOpen: showEditPanel,
            headerText: state.selected?.name,
            onDismiss: toggleEditPanel,
            onSave: () => {
              toggleEditPanel()
              refetch()
            }
          }}
        />
      </div>
    </div>
  )
}

CustomerActions.displayName = 'CustomerActions'
CustomerActions.className = styles.customerActions
