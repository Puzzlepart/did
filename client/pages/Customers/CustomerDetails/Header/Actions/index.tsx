import { Button } from '@fluentui/react-components'
import { usePermissions } from 'hooks'
import { CustomersContext } from 'pages/Customers/context'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import useBoolean from 'usehooks-ts/dist/esm/useBoolean/useBoolean'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { CustomerForm } from '../../../CustomerForm'
import styles from './Actions.module.scss'
/**
 * @category Customers
 */
export const Actions: StyledComponent = (props) => {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { state, refetch } = useContext(CustomersContext)
  const { value: showEditPanel, toggle: toggleEditPanel } = useBoolean(false)
  return (
    <div className={Actions.className} hidden={props.hidden}>
      <div className={styles.container}>
        {state.selected?.webLink && (
          <Button
            appearance='transparent'
            icon={icon('WebAsset')}
            onClick={() => window.open(state.selected?.webLink, '_blank')}
          >
            {t('customers.webLinkText')}
          </Button>
        )}
        {state.selected?.externalSystemURL && (
          <Button
            appearance='transparent'
            icon={icon('System')}
            onClick={() =>
              window.open(state.selected?.externalSystemURL, '_blank')
            }
          >
            {t('customers.externalSystemUrlText')}
          </Button>
        )}
        {hasPermission(PermissionScope.MANAGE_CUSTOMERS) && (
          <>
            <Button
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
          </>
        )}
      </div>
    </div>
  )
}

Actions.displayName = 'CustomerDetails.Actions'
Actions.className = styles.actions
