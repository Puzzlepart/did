import { Skeleton, SkeletonItem } from '@fluentui/react-components'
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
    <div className={ProjectHeader.className}>
      {loading ? (
        <Skeleton>
          <SkeletonItem style={{ width: '100%', height: 32 }} />
        </Skeleton>
      ) : (
        <div className={styles.container}>
          <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
          <ProjectActions hidden={isMobile} />
        </div>
      )}
    </div>
  )
}

ProjectHeader.displayName = 'ProjectHeader'
ProjectHeader.className = styles.projectHeader
