import { Shimmer } from '@fluentui/react'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../context'
import { ProjectActions } from './ProjectActions'
import styles from './ProjectHeader.module.scss'
import { useProjectHeader } from './useProjectHeader'
import { Breadcrumb, SubText} from 'components'

/**
 * @category Projects
 */
export const ProjectHeader: StyledComponent = () => {
  const { state, loading } = useProjectsContext()
  const { breadcrumbItems } = useProjectHeader()
  return (
    <Shimmer
      className={ProjectHeader.className}
      isDataLoaded={!loading}
      styles={{ dataWrapper: { width: '100%' } }}
    >
      <div className={styles.container}>
        <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
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
