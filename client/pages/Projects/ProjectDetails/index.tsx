import { Modal, Pivot, PivotItem, ScrollablePane, ScrollbarVisibility } from '@fluentui/react'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { ProjectsContext } from '../context'
import { CHANGE_DETAILS_TAB, SET_SELECTED_PROJECT } from '../reducer/actions'
import { Header } from './Header'
import styles from './ProjectDetails.module.scss'
import { ProjectInformation } from './ProjectInformation'
import { TimeEntries } from './TimeEntries'

export const ProjectDetails: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { state, dispatch } = useContext(ProjectsContext)
  const containerClassName = [styles.root]
  if (isMobile) containerClassName.push(styles.isMobile)
  return (
    <Modal
      isOpen={!!state.selected}
      containerClassName={containerClassName.join(' ')}
      scrollableContentClassName={styles.content}
      onDismiss={() => {
        dispatch(SET_SELECTED_PROJECT({ project: null }))
        history.push(`/projects/${state.view}`)
      }}>
      <Header />
      {isMobile ? (
        <ProjectInformation />
      ) : (
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
            <ProjectInformation />
          </PivotItem>
          <PivotItem
            headerText={t('projects.timeEntriesHeaderText')}
            itemKey='timeentries'
            itemIcon='ReminderTime'
            className={styles.timeEntries}
          >
            <ScrollablePane
              scrollbarVisibility={ScrollbarVisibility.auto}
              styles={{ contentContainer: { overflowX: 'hidden' } }}
            >
              <TimeEntries />
            </ScrollablePane>
          </PivotItem>
        </Pivot>
      )}
    </Modal>
  )
}

export * from './Header'
export * from './ProjectInformation'
export * from './TimeEntries'

