import { Shimmer } from '@fluentui/react'
import { Breadcrumb, SubText } from 'components'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { CustomersContext } from '../../context'
import { CustomerActions } from './CustomerActions'
import styles from './CustomerHeader.module.scss'
import { useCustomerHeaderBreadcrumb } from './useCustomerHeaderBreadcrumb'

/**
 * @category Customers
 */
export const CustomerHeader: StyledComponent = () => {
  const { state, loading } = useContext(CustomersContext)
  const breadcrumbItems = useCustomerHeaderBreadcrumb()
  return (
    <Shimmer
      className={CustomerHeader.className}
      isDataLoaded={!loading}
      styles={{ dataWrapper: { width: '100%' } }}
    >
      <div
        className={styles.container}
        style={{ display: isMobile ? 'none' : 'flex' }}
      >
        <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
        <CustomerActions />
      </div>
      <SubText
        className={styles.description}
        text={state.selected?.description}
        font='medium'
      />
    </Shimmer>
  )
}

CustomerHeader.displayName = 'CustomerHeader'
CustomerHeader.className = styles.customerHeader
