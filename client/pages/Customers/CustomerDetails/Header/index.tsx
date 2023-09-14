import { Breadcrumb, Shimmer } from '@fluentui/react'
import { CustomersContext } from 'pages/Customers/context'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { Actions } from './Actions'
import styles from './Header.module.scss'
import { useHeader } from './useHeader'

/**
 * @category Customers
 */
export const Header: StyledComponent = () => {
  const { loading } = useContext(CustomersContext)
  const { breadcrumb } = useHeader()
  return (
    <Shimmer
      className={Header.className}
      isDataLoaded={!loading}
      styles={{ dataWrapper: { width: '100%', display: 'flex' } }}
    >
      <div className={styles.breadcrumb}>
        <Breadcrumb {...breadcrumb} />
      </div>
      <Actions hidden={isMobile} />
    </Shimmer>
  )
}

Header.displayName = 'CustomerDetails.Header'
Header.className = styles.header