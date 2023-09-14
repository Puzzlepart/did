import { Breadcrumb, Shimmer } from '@fluentui/react'
import { SubText } from 'components/SubText'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../context'
import { Actions } from './Actions'
import styles from './ProjectHeader.module.scss'
import { useHeader } from './useHeader'

/**
 * @category Projects
 */
export const ProjectHeader: StyledComponent = () => {
  const { state, loading } = useProjectsContext()
  const { breadcrumb } = useHeader()
  return (
    <Shimmer
      className={ProjectHeader.className}
      isDataLoaded={!loading}
      styles={{ dataWrapper: { width: '100%', display: 'flex' } }}
    >
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Breadcrumb {...breadcrumb} />
        </div>
        <Actions hidden={isMobile} />
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
