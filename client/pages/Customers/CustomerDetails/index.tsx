import { useQuery } from '@apollo/client'
import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects'
import React, { FC, useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import { Information } from './Information'
import $projects from './projects.gql'

/**
 * @category Customers
 */
export const CustomerDetails: FC = () => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>()
  const { state } = useContext(CustomersContext)
  const { loading, error, data } = useQuery($projects, {
    variables: {
      customerKey: state.selected?.key
    }
  })

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
            items={data?.projects || []}
            hideColumns={['customer']}
            enableShimmer={loading}
            searchBox={{
              styles: {
                root: { width: ref.current?.clientWidth - 110 }
              },
              placeholder: t(
                'customers.searchProjectsPlaceholder',
                state.selected
              )
            }}
            renderLink={true}
          />
        )}
      </div>
    </div>
  )
}
