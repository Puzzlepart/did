import { Breadcrumb, Shimmer } from '@fluentui/react'
import { SubText } from 'components/SubText'
import { useProjectsContext } from 'pages/Projects/context'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'
import { Actions } from './Actions'
import styles from './Header.module.scss'
import { useHeader } from './useHeader'

/**
 * @category Projects
 */
export const Header: StyledComponent = () => {
  const { state, loading } = useProjectsContext()
  const { breadcrumb } = useHeader()
  return (
    <Shimmer
      className={Header.className}
      isDataLoaded={!loading}
      styles={{ dataWrapper: { width: '100%' } }}
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

Header.displayName = 'ProjectDetails.Header'
Header.className = styles.header
