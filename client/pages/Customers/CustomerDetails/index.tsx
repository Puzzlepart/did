import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import { Information } from './Information'
import { useCustomerList } from './useCustomerList'

/**
 * @category Customers
 */
export const CustomerDetails: FC = () => {
  const { t } = useTranslation()
  const { state } = useContext(CustomersContext)
  const { ref, error, projects, loading } = useCustomerList()

  return (
    <div className={styles.root} ref={ref}>
      <Header />
      <Information />
      <div>
        {error && (
          <UserMessage type='error'>{t('common.genericErrorText')}</UserMessage>
        )}
        {!error && (
          <ProjectList
            items={projects}
            hideColumns={['customer']}
            enableShimmer={loading}
            searchBox={{
              styles: {
                root: { width: ref.current?.clientWidth - 110 }
              },
              placeholder: t(
                'customers.searchProjectsPlaceholder',
                state.selected
              ),
              disabled: true
            }}
            renderLink={true}
          />
        )}
      </div>
    </div>
  )
}
