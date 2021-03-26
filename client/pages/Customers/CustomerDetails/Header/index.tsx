/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import { SubText } from 'components'
import { CustomersContext } from 'pages/Customers/context'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { CustomerActions } from './actions'
import styles from './Header.module.scss'

/**
 * @category Customers
 */
export const Header: React.FC = () => {
  const { state } = useContext(CustomersContext)
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.iconContainer}>
          <Icon iconName={state.selected.icon || 'Page'} />
        </div>
        <div className={styles.text}>{state.selected.name}</div>
        <SubText text={state.selected.description} />
      </div>
      <CustomerActions hidden={isMobile} />
    </div>
  )
}
