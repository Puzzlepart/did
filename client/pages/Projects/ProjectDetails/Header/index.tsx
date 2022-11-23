import { Breadcrumb } from '@fluentui/react'
import React, { FC, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { ProjectsContext } from '../../context'
import { Actions } from '../Actions'
import styles from './Header.module.scss'

/**
 * @category Projects
 */
export const Header: FC = () => {
  const { state } = useContext(ProjectsContext)
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Breadcrumb items={[
          {
            key: 'projects',
            text: 'Prosjekter'
          },
          {
            key: 'customer',
            text: state.selected.customer.name
          },
          {
            key: 'project',
            text: state.selected.name
          }
        ]} />
      </div>
      <Actions hidden={isMobile} />
    </div>
  )
}
