import { Skeleton, SkeletonItem } from '@fluentui/react-components'
import { Breadcrumb } from 'components'
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
  const { loading } = useContext(CustomersContext)
  const breadcrumbItems = useCustomerHeaderBreadcrumb()
  return (
    <div className={CustomerHeader.className}>
      {loading ? (
        <Skeleton>
          <SkeletonItem style={{ width: '100%', height: 32 }} />
        </Skeleton>
      ) : (
        <div
          className={styles.container}
          style={{ display: isMobile ? 'none' : 'flex' }}
        >
          <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
          <CustomerActions />
        </div>
      )}
    </div>
  )
}

CustomerHeader.displayName = 'CustomerHeader'
CustomerHeader.className = styles.customerHeader
