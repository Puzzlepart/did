import { InformationProperty } from 'components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import styles from './ProjectTimeEntriesSummary.module.scss'
import { IProjectTimeEntriesSummaryProps } from './types'
import { useProjectTimeEntriesSummary } from './useProjectTimeEntriesSummary'

/**
 * @category Projects
 */
export const ProjectTimeEntriesSummary: StyledComponent<IProjectTimeEntriesSummaryProps> = (
  props
) => {
  const items = useProjectTimeEntriesSummary(props)
  return (
    <div className={ProjectTimeEntriesSummary.className} hidden={isMobile}>
      <div className={styles.container}>
        {items.map(({ label, value }, index) => (
          <InformationProperty
            key={index}
            title={label}
            className={styles.item}
            isDataLoaded={!props.loading}
            onRenderValue={() => <span className={styles.value}>{value}</span>}
          />
        ))}
      </div>
    </div>
  )
}

ProjectTimeEntriesSummary.displayName = 'ProjectTimeEntriesSummary'
ProjectTimeEntriesSummary.className = styles.projectTimeEntriesSummary
