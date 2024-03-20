import { Shimmer } from '@fluentui/react'
import { Breadcrumb } from 'components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../context'
import { ProjectActions } from './ProjectActions'
import styles from './ProjectHeader.module.scss'
import { useProjectHeaderBreadcrumb } from './useProjectHeaderBreadcrumb'

/**
 * @category Projects
 */
export const ProjectHeader: StyledComponent = () => {
  const { loading } = useProjectsContext()
  const breadcrumbItems = useProjectHeaderBreadcrumb()
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
    </Shimmer>
  )
}

ProjectHeader.displayName = 'ProjectHeader'
ProjectHeader.className = styles.projectHeader
