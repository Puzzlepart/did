/* eslint-disable tsdoc/syntax */
import { Modal, Pivot, PivotItem } from '@fluentui/react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { ProjectsContext } from '../context'
import { CHANGE_DETAILS_TAB, SET_SELECTED_PROJECT } from '../reducer/actions'
import { Header } from './Header'
import { Information } from './Information'
import styles from './ProjectDetails.module.scss'
import { TimeEntries } from './TimeEntries'

/**
 * @category Projects
 */
export const ProjectDetails: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { state, dispatch } = useContext(ProjectsContext)
  return (
    <Modal
      isOpen={!!state.selected}
      onDismiss={() => {
        dispatch(SET_SELECTED_PROJECT({ project: null }))
        history.push(`/projects/${state.view}`)
      }}
      containerClassName={styles.root}>
      <Header />
      <Pivot
        defaultSelectedKey={state.detailsTab}
        onLinkClick={({ props }) =>
          dispatch(CHANGE_DETAILS_TAB({ detailsTab: props.itemKey }))
        }
      >
        <PivotItem
          headerText={t('projects.informationHeaderText')}
          itemKey='information'
          itemIcon='Info'
        >
          <Information />
        </PivotItem>
        <PivotItem
          headerText={t('projects.timeEntriesHeaderText')}
          itemKey='timeentries'
          itemIcon='ReminderTime'
        >
          <TimeEntries />
        </PivotItem>
      </Pivot>
    </Modal>
  )
}

export * from './Header'
export * from './Information'
export * from './TimeEntries'

