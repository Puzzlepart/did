/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import { SubText } from 'components'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { ProjectsContext } from '../../context'
import { Actions } from '../Actions'
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
        <SubText text={state.selected.customer.name} />
      </div>
      <Actions hidden={isMobile} />
    </div>
  )
}
