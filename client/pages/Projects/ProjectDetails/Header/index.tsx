import { Icon } from 'office-ui-fabric'
import React, { FunctionComponent, useContext } from 'react'
import { ProjectDetailsContext } from '../context'
import { Actions } from './actions'
import styles from './Header.module.scss'

export const Header: FunctionComponent = () => {
  const { project } = useContext(ProjectDetailsContext)
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icon iconName={project.icon} />
      </div>
      <div className={styles.title}>
        <div className={styles.text}>{project.name}</div>
        <div className={styles.subText}>{project.customer.name}</div>
      </div>
      <Actions project={project} />
    </div>
  )
}
