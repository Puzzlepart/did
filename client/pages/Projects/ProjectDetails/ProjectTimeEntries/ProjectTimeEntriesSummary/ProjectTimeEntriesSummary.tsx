import { Shimmer } from '@fluentui/react'
import { mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import styles from './ProjectTimeEntriesSummary.module.scss'
import { ISummaryProps } from './types'
import { useSummary } from './useSummary'

/**
 * @category Projects
 */
export const ProjectTimeEntriesSummary: StyledComponent<ISummaryProps> = (
  props
) => {
  const items = useSummary(props)
  return (
    <div className={ProjectTimeEntriesSummary.className} hidden={isMobile}>
      <div className={styles.container}>
        {items.map(({ label, value }, index) => (
          <div key={index} className={styles.item}>
            <Shimmer
              isDataLoaded={!props.loading}
              className={mergeClasses(
                styles.value,
                props.loading && styles.shimmer
              )}
            >
              {value}
            </Shimmer>
            <Shimmer
              className={mergeClasses(
                styles.label,
                props.loading && styles.shimmer
              )}
              isDataLoaded={!props.loading}
            >
              {label}
            </Shimmer>
          </div>
        ))}
      </div>
    </div>
  )
}

ProjectTimeEntriesSummary.displayName = 'ProjectTimeEntriesSummary'
ProjectTimeEntriesSummary.className = styles.projectTimeEntriesSummary
