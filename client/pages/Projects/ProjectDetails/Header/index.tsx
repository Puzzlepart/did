/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react-react'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { ProjectsContext } from '../../context'
import { ProjectActions } from './actions'
import styles from './Header.module.scss'

/**
 * @category Projects
 */
export const Header: React.FC = () => {
  const { state } = useContext(ProjectsContext)
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icon iconName={state.selected.icon} />
      </div>
      <div className={styles.title}>
        <div className={styles.text}>{state.selected.name}</div>
        <div className={styles.subText}>{state.selected.customer.name}</div>
      </div>
      <ProjectActions hidden={isMobile} />
    </div>
  )
}
