import { Breadcrumb, Shimmer } from '@fluentui/react'
import { SubText } from 'components/SubText'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../context'
import { ProjectActions } from './ProjectActions'
import styles from './ProjectHeader.module.scss'
import { useProjectHeader } from './useProjectHeader'

/**
 * @category Projects
 */
export const ProjectHeader: StyledComponent = () => {
  const { state, loading } = useProjectsContext()
  const { breadcrumb } = useProjectHeader()
  return (
    <Shimmer
      className={ProjectHeader.className}
      isDataLoaded={!loading}
      styles={{ dataWrapper: { width: '100%' } }}
    >
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Breadcrumb {...breadcrumb} />
        </div>
        <ProjectActions hidden={isMobile} />
      </div>
      <SubText
        className={styles.description}
        text={state.selected?.description}
        font='medium'
      />
    </Shimmer>
  )
}

ProjectHeader.displayName = 'ProjectHeader'
ProjectHeader.className = styles.projectHeader
