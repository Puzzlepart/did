import { Breadcrumb, Shimmer } from '@fluentui/react'
import { CustomersContext } from 'pages/Customers/context'
import React, { FC, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { Actions } from './Actions'
import styles from './Header.module.scss'
import { useHeader } from './useHeader'

/**
 * @category Customers
 */
export const Header: FC = () => {
  const { loading } = useContext(CustomersContext)
  const { breadcrumb } = useHeader()
  return (
    <Shimmer
      className={styles.root}
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
