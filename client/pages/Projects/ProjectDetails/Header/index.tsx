import { Breadcrumb } from '@fluentui/react'
import { SubText } from 'components/SubText'
import { ProjectsContext } from 'pages/Projects/context'
import React, { FC, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { Actions } from './Actions'
import styles from './Header.module.scss'
import { useHeader } from './useHeader'

/**
 * @category Projects
 */
export const Header: FC = () => {
  const { state } = useContext(ProjectsContext)
  const { breadcrumb } = useHeader()
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Breadcrumb {...breadcrumb} />
        </div>
        <Actions hidden={isMobile} />
      </div>
      <SubText className={styles.description} text={state.selected.description} font='medium' />
    </div>
  )
}
