/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { Modal, ScrollablePane, ScrollbarVisibility } from '@fluentui/react'
import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { CustomersContext } from '../context'
import { SET_SELECTED_CUSTOMER } from '../reducer/actions'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import $projects from './projects.gql'

/**
 * @category Customers
 */
export const CustomerDetails: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { state, dispatch } = useContext(CustomersContext)
  const { loading, error, data } = useQuery($projects, {
    variables: {
      customerKey: state.selected?.key
    }
  })
  const containerClassName = [styles.root]
  if (isMobile) containerClassName.push(styles.isMobile)
  return (
    <Modal
      isOpen={!!state.selected}
      containerClassName={containerClassName.join(' ')}
      onDismiss={() => {
        dispatch(SET_SELECTED_CUSTOMER({ customer: null }))
        history.push(`/customers/${state.view}`)
      }}>
      <Header />
      <div className={styles.content}>
        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.auto}
          styles={{ contentContainer: { overflowX: 'hidden' } }}
        >
          {state.selected?.inactive && (
            <UserMessage
              text={t('customers.inactiveText')}
              iconName='Warning'
              type={'warning'}
            />
          )}
          <div>
            {error && (
              <UserMessage type='error'>{t('common.genericErrorText')}</UserMessage>
            )}
            {!error && (
              <ProjectList
                items={data?.projects || []}
                hideColumns={['customer', isMobile && 'key']}
                enableShimmer={loading}
                searchBox={{ placeholder: t('customers.searchProjectsPlaceholder', state.selected) }}
                renderLink={true} />
            )}
          </div>
        </ScrollablePane>
      </div>
    </Modal>
  )
}
