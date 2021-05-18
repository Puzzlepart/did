/* eslint-disable tsdoc/syntax */
import React from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import styles from './Summary.module.scss'
import { ISummaryProps } from './types'
import { useSummary } from './useSummary'

/**
 * @category Projects
 */
export const Summary: React.FC<ISummaryProps> = ({
  timeentries,
  loading
}: ISummaryProps) => {
  const items = useSummary(timeentries)
  return (
    <div hidden={isMobile}>
      <FadeIn className={styles.root}>
        {items.map(({ label, value }, index) => (
          <div
            key={index}
            className={styles.item}
            style={{ opacity: loading ? 0 : 1 }}>
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </FadeIn>
    </div>
  )
}
