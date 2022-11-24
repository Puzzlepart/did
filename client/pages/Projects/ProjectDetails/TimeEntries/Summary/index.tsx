import { Shimmer } from '@fluentui/react'
import React, { FC } from 'react'
import { isMobile } from 'react-device-detect'
import styles from './Summary.module.scss'
import { ISummaryProps } from './types'
import { useSummary } from './useSummary'

/**
 * @category Projects
 */
export const Summary: FC<ISummaryProps> = (props) => {
  const items = useSummary(props)
  return (
    <div className={styles.root} hidden={isMobile}>
      {items.map(({ label, value }, index) => (
        <div key={index} className={styles.item}>
          <Shimmer isDataLoaded={!props.loading} className={styles.value}>
            {value}
          </Shimmer>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  )
}
