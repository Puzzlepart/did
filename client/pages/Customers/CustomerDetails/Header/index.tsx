import { Breadcrumb } from '@fluentui/react'
import React, { FC } from 'react'
import { isMobile } from 'react-device-detect'
import { Actions } from './Actions'
import styles from './Header.module.scss'
import { useHeader } from './useHeader'

/**
 * @category Customers
 */
export const Header: FC = () => {
  const { breadcrumb } = useHeader()
  return (
    <div className={styles.root}>
      <div className={styles.breadcrumb}>
        <Breadcrumb {...breadcrumb} />
      </div>
      <Actions hidden={isMobile} />
    </div>
  )
}
